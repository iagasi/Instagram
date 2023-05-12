/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SERVER_URL:process.env.SEVER_URL
  }
}

module.exports = nextConfig
