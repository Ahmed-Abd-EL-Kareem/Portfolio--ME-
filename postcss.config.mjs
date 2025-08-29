const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // تحسين الأداء - ضغط CSS
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          minifyFontValues: true,
          minifySelectors: true,
        }],
      },
    }),
  },
};

export default config;
