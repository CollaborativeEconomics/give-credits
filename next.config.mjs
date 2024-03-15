/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'give.staging.cfce.io',
        port: '',
        pathname: '/media/**'
      },
      {
        protocol: 'https',
        hostname: 'ipfs.filebase.io',
        port: '',
        pathname: '/ipfs/**'
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**'
      },
      {
        protocol: 'https',
        hostname: 'partners.cfce.io',
        port: '',
        pathname: '/**'
      }
    ],
  }
};

export default nextConfig;