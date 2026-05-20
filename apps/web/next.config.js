/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,

  experimental: {
    viewTransition: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/auth/:slug*",
        destination: "http://localhost:3000/api/auth/:slug*",
      },
    ];
  },
};

export default nextConfig;
