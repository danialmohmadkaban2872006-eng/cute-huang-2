/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'apod.nasa.gov' },
      { protocol: 'https', hostname: '**.nasa.gov' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
  env: {
    NASA_API_KEY: process.env.NASA_API_KEY,
  },
};

module.exports = nextConfig;
