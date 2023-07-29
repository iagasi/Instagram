/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SERVER_URL:process.env.SEVER_URL
  },
  images:{
    domains: ["localhost","res.cloudinary.com","https://server-pc0e.onrender.com"],
  },

  
}

module.exports = nextConfig
