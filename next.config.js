/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
//added this for the 'user server' on add a new water
module.exports = {
    experimental: {
      serverActions: true,
    },
  }