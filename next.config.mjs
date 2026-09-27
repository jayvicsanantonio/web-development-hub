// Next.js configuration: a fully static export for Cloudflare Workers to serve,
// built against a freshly generated icon bundle.
import { writeIconBundle } from './scripts/build-icons.mjs';

// Every build and dev server starts from an icon bundle that matches the
// source. It throws on an icon the installed sets lack, failing the build.
writeIconBundle();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site to ./out. Every route in this app prerenders, so
  // there is no server to deploy: Cloudflare Workers serves ./out as static
  // assets with no Worker script. See wrangler.jsonc.
  output: 'export',

  images: {
    // The Next image optimizer needs a server; nothing in this app imports
    // next/image, so opt out rather than ship an optimizer that cannot run.
    unoptimized: true,
  },

  // Response headers live in public/_headers, which Cloudflare Workers parses
  // natively. next.config's headers() is a no-op under `output: 'export'`.
};

export default nextConfig;
