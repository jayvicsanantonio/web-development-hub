import { test, expect } from '@playwright/test';
import { SECTIONS } from '../constants/sections';
import { toSectionId } from '../lib/utils/navigation';

// Section pages come from the dataset, so a section added there is checked
// here without a second edit.
const ROUTES = [
  '/',
  ...SECTIONS.map((section) => section.href),
  '/bookmarks',
  '/privacy-policy',
  '/terms-of-service',
];

test.describe('the deployed static export', () => {
  for (const path of ROUTES) {
    test(`serves ${path}`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status(), `${path} status`).toBe(200);
      await expect(page.locator('body')).toBeVisible();
    });
  }

  test('serves 404.html for an unknown path', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
  });

  test('applies the security headers from public/_headers', async ({
    page,
  }) => {
    // These live in _headers rather than next.config now, so nothing in the
    // build would catch it if the file stopped being parsed.
    const response = await page.goto('/');
    const headers = response!.headers();
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('origin-when-cross-origin');

    const csp = headers['content-security-policy'];
    expect(csp, 'Content-Security-Policy').toBeTruthy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    // Iconify is the only origin the page is allowed to talk to.
    expect(csp).toContain('https://api.iconify.design');

    expect(headers['permissions-policy']).toContain('geolocation=()');
  });

  test('loads with no console errors, so the CSP blocks nothing it needs', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('does not serve _headers itself as an asset', async ({
    request,
  }) => {
    expect((await request.get('/_headers')).status()).toBe(404);
  });

  test('emits a favicon link', async ({ page }) => {
    // The site shipped with none at all until metadata.icons was added.
    await page.goto('/');
    await expect(
      page.locator('link[rel="icon"]').first()
    ).toHaveAttribute('href', /icon/);
  });

  test('serves the manifest at the path the service worker precaches', async ({
    request,
  }) => {
    expect((await request.get('/manifest.webmanifest')).status()).toBe(
      200
    );
  });

  test('lists sitemap URLs that all resolve', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      new URL(m[1]).pathname
    );
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(
        (await request.get(path)).status(),
        `sitemap lists ${path}`
      ).toBe(200);
    }
  });
});

test.describe('theme', () => {
  test('paints the stored theme on the first frame', async ({
    page,
  }) => {
    // The class used to be applied from an effect after hydration, so a
    // visitor who had chosen light saw the dark default flash first.
    await page.addInitScript(() =>
      localStorage.setItem('theme', 'light')
    );
    await page.goto('/');

    // documentElement is read before any of the page's own scripts could have
    // reacted to load; the blocking script in <head> has already run.
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    await page.addInitScript(() =>
      localStorage.setItem('theme', 'dark')
    );
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('follows the system preference when nothing is stored', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      colorScheme: 'light',
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await context.close();
  });
});

test.describe('metadata', () => {
  test('gives every section page its own title and description', async ({
    page,
  }) => {
    // Every page shared the root layout's single title until each route
    // became a server component that could export its own metadata.
    for (const section of SECTIONS) {
      await page.goto(section.href);

      await expect(page).toHaveTitle(
        `${section.title} | Web Development Hub`
      );
      await expect(
        page.locator('meta[name="description"]')
      ).toHaveAttribute('content', section.description);
    }
  });
});

test.describe('navigation', () => {
  test('every section anchor the nav points at exists on the page', async ({
    page,
  }) => {
    // The Blogs entry declared section-blogs while the page rendered
    // section-blogs-and-newsletters, so it could neither scroll nor highlight.
    await page.goto('/');
    for (const section of SECTIONS) {
      // Imported rather than reimplemented: a local copy of the slug rule
      // would drift in step with the bug this test exists to catch.
      const id = toSectionId(section.title);
      await expect(
        page.locator(`#${id}`),
        `${section.title} anchor`
      ).toHaveCount(1);
    }
  });
});

test.describe('search', () => {
  test('narrows the page to matching resources', async ({ page }) => {
    await page.goto('/');

    const target = SECTIONS[0].links[0].title;
    // A resource from a different section whose title shares nothing with the
    // query, so it must disappear if search is actually filtering. Asserting
    // only that the target is visible would pass even with search broken —
    // it is already on the page before anyone types.
    const decoy = SECTIONS[1].links.find(
      (l) =>
        !l.title.toLowerCase().includes(target.toLowerCase()) &&
        !target.toLowerCase().includes(l.title.toLowerCase())
    )!.title;

    await expect(page.getByText(decoy, { exact: true }).first()).toBeVisible();

    await page
      .getByRole('searchbox', { name: /search resources/i })
      .fill(target);

    await expect(page.getByText(target, { exact: true }).first()).toBeVisible();
    await expect(
      page.getByText(decoy, { exact: true })
    ).toHaveCount(0);
  });
});

test.describe('tag filtering', () => {
  test('narrows a category page to the selected tag', async ({
    page,
  }) => {
    // The panel reported "1 active" while the page went on rendering every
    // resource: the filter was only ever applied alongside a typed query.
    await page.goto('/developer-tools');

    const cards = page.locator('main article');
    const before = await cards.count();
    expect(before).toBeGreaterThan(0);

    await page
      .locator('button[aria-label^="Filter resources"]:visible')
      .first()
      .click();
    await page
      .getByRole('button', { name: 'paid', exact: true })
      .first()
      .click();

    // Reported without an empty `for ""`, since nothing was typed.
    await expect(page.getByText(/^Found \d+ results?$/)).toBeVisible();
    expect(await cards.count()).toBeLessThan(before);
  });
});

test.describe('bookmarks', () => {
  test('a bookmark survives a reload', async ({ page }) => {
    await page.goto('/');

    // A named resource rather than "the first bookmark button". The button's
    // accessible name is what identifies it, and toggling flips that name, so
    // a `.first()` locator would quietly re-resolve to a different card the
    // moment the bookmark is added.
    const { title } = SECTIONS[0].links[0];
    const add = page.getByRole('button', {
      name: `Add ${title} to bookmarks`,
      exact: true,
    });
    const added = page.getByRole('button', {
      name: `Remove ${title} from bookmarks`,
      exact: true,
    });

    await add.click();
    // The label only flips once React has the click, so this pins a later
    // failure on persistence rather than on the click never landing.
    await expect(added).toBeVisible();

    await page.goto('/bookmarks');

    // This page prerenders its empty state: bookmarks live in localStorage,
    // so the cards exist only after the provider has hydrated and read it -
    // tens of milliseconds after the load event that page.goto() waits for.
    // Everything here has to be a retrying assertion. Reading count()
    // straight after the navigation samples the page exactly once, and hit
    // that gap on roughly a quarter of runs.
    const card = page.getByRole('link', { name: title, exact: true });
    await expect(card).toBeVisible();

    // Safe now: the assertion above has already waited out the hydration gap.
    const afterAdd = await page.locator('a[href^="http"]').count();

    await page.reload();
    await expect(card).toBeVisible();
    await expect(page.locator('a[href^="http"]')).toHaveCount(
      afterAdd
    );
  });
});
