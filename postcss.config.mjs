const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Note: Next.js already minifies CSS in production via SWC. Keeping
    // the config minimal avoids optional plugins like cssnano.
  },
};

export default config;
