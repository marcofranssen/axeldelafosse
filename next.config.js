const withPlugins = require('next-compose-plugins');
const slug = require('remark-slug');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true
  },
  publicRuntimeConfig: false,
  images: {
    loader: 'custom'
  },
  experimental: {
    optimizeCss: true
  },
  future: {
    strictPostcssConfiguration: true
  },
  async headers() {
    const cacheHeaders = [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ];
    return [{ source: '/_next/static/:static*', headers: cacheHeaders }];
  }
};

module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        runtimeCaching
      }
    }
  ],
  [
    withMDX,
    {
      pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
      remarkPlugins: [slug]
    }
  ],
  nextConfig
]);
