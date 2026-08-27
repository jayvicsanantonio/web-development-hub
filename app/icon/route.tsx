// Serves the application favicon with proper headers and caching.
// Runs on the Node runtime: Next 16 deprecated the Edge Runtime, and pinning it
// here also opted this route out of static generation.

import { ImageResponse } from 'next/og'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        WDH
      </div>
    ),
    {
      width: 32,
      height: 32,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  )
}
