/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['img.clerk.com']
  },
  experimental: {
    serverActions: true,
    appDir: true,
    esmExternals: true
  },
  cssModules: true,
     cssLoaderOptions: {
   importLoaders: 1,
  localIdentName: "[]",
 },
}

module.exports = nextConfig