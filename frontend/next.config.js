/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SERVER_URL:process.env.SEVER_URL
  },
  images:{
    domains: ["localhost"],
  }
}

module.exports = nextConfig
