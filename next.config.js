/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations

  // Transpile packages for better performance
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'three-stdlib',
  ],

  // Advanced image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },

  // Enhanced webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Resolve aliases for better tree shaking
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }

    // Fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }

    // Production optimizations
    if (!dev && !isServer) {
      // Enable aggressive tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: './bundle-analysis.html',
        })
      )
    }

    return config
  },

  // Advanced caching headers
  async headers() {
    const isProd = process.env.NODE_ENV === 'production'

    const commonSecurityHeaders = {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    }

    // Only apply long-term immutable caching for static assets in production.
    const prodCachingHeaders = isProd
      ? [
          {
            source: '/_next/static/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/images/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/fonts/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/favicon.ico',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/manifest.json',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
          },
          {
            source: '/main.jpg',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/main1.jpg',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/logo.png',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
        ]
      : []

    return [commonSecurityHeaders, ...prodCachingHeaders]
  },

  // Compiler optimizations (SWC)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove React dev tools in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    // Enable modern JavaScript features
    styledComponents: false,
  },

  // Optimize bundle splitting
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@react-three/fiber',
      '@react-three/drei',
      'react-icons',
      'three',
    ],
    // Enable modern JavaScript features
    esmExternals: true,
    // Enable more aggressive optimizations
    serverMinification: true,
    serverSourceMaps: false,
    // Optimize CSS loading - disabled due to critters dependency issues
    // optimizeCss: process.env.NODE_ENV === 'production',
  },

  // Performance flags
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Additional performance optimizations
  reactStrictMode: true,
  swcMinify: true,

  // Trailing slash optimization
  trailingSlash: false,

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Rewrites for better performance
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = nextConfig
