


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   transpilePackages: ["@repo/ui", "@repo/shared", "@repo/types"],
  
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '4000',
//         pathname: '/uploads/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/shared", "@repo/types"],

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },

  async redirects() {
    return [
      { source: '/:locale/works', destination: '/:locale/portfolio', permanent: true },
      { source: '/:locale/works/:slug', destination: '/:locale/portfolio', permanent: true },
      { source: '/works', destination: '/portfolio', permanent: true },
      { source: '/works/:slug', destination: '/portfolio', permanent: true },

      { source: '/:locale/services', destination: '/:locale/service', permanent: true },
      { source: '/:locale/services/:slug', destination: '/:locale/service', permanent: true },
      { source: '/services', destination: '/service', permanent: true },
      { source: '/services/:slug', destination: '/service', permanent: true },

      { source: '/:locale/privacy', destination: '/:locale/privacypolicy', permanent: true },
      { source: '/privacy', destination: '/privacypolicy', permanent: true },
    ];
  },
};

export default nextConfig;