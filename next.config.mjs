/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site to ./out. Every route in this app prerenders, so
  // there is no server to deploy: Cloudflare Workers serves ./out as static
  // assets with no Worker script. See wrangler.jsonc.
  output: 'export',

  // Optimize performance
  experimental: {
    optimizePackageImports: ['@iconify/react'],
  },

  images: {
    // The Next image optimizer needs a server; nothing in this app imports
    // next/image, so opt out rather than ship an optimizer that cannot run.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Response headers live in public/_headers, which Cloudflare Workers parses
  // natively. next.config's headers() is a no-op under `output: 'export'`.
};

export default nextConfig;
