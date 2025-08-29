import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Ahmed Abd EL Kareem
        </div>
        <div
          style={{
            fontSize: 40,
            marginBottom: '40px',
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          Full Stack Web Developer
        </div>
        <div
          style={{
            fontSize: 24,
            textAlign: 'center',
            opacity: 0.8,
            maxWidth: '800px',
          }}
        >
          React • Next.js • Node.js • TypeScript • MongoDB
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
