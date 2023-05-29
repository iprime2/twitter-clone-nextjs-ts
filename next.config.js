/** @type {import('next').NextConfig} */
const nextConfig = {}

const config = {
  api: {
    responseLimit: false,
    // responseLimit: '8mb',
  },
}

module.exports = { nextConfig, config }

