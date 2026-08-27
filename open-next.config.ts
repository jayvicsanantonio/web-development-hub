import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * Cloudflare Workers adapter config for `pnpm preview` / `deploy` / `upload`.
 * Defaults are sufficient: this site is fully prerendered, so no incremental
 * cache or queue override is needed.
 */
export default defineCloudflareConfig();
