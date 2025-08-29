/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@react-three/fiber', '@react-three/drei'],
    swcPlugins: [],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'three-stdlib'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', port: '', pathname: '/**' },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' },
          three: { test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/, name: 'three', chunks: 'all', priority: 10 },
          framer: { test: /[\\/]node_modules[\\/]framer-motion[\\/]/, name: 'framer', chunks: 'all', priority: 10 },
        },
      };
    }
    return config;
  },
  async headers() {
    return [
      { source: '/(.*)', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ]},
      { source: '/_next/static/(.*)', headers: [ { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' } ] },
      { source: '/images/(.*)', headers: [ { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' } ] },
      { source: '/fonts/(.*)', headers: [ { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' } ] },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
};

module.exports = nextConfig;
