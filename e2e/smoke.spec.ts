import { test, expect } from '@playwright/test';
import { SECTIONS } from '../constants/sections';

const ROUTES = [
  '/',
  '/learning-resources',
  '/developer-tools',
  '/frameworks-and-libraries',
  '/communities',
  '/blogs',
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

test.describe('navigation', () => {
  test('every section anchor the nav points at exists on the page', async ({
    page,
  }) => {
    // The Blogs entry declared section-blogs while the page rendered
    // section-blogs-and-newsletters, so it could neither scroll nor highlight.
    await page.goto('/');
    for (const section of SECTIONS) {
      const id = `section-${section.title
        .toLowerCase()
        .replace(/\s+&\s+/g, '-')
        .replace(/\s+/g, '-')}`;
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

test.describe('bookmarks', () => {
  test('a bookmark survives a reload', async ({ page }) => {
    await page.goto('/');

    const toggle = page
      .getByRole('button', { name: /bookmark/i })
      .first();
    await toggle.click();

    await page.goto('/bookmarks');
    const afterAdd = await page
      .locator('a[href^="http"]')
      .count();
    expect(afterAdd).toBeGreaterThan(0);

    await page.reload();
    await expect(page.locator('a[href^="http"]')).toHaveCount(
      afterAdd
    );
  });
});
