/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Vercel's native Next.js SSR for better SEO
  // (removed 'output: export' which caused deployment issues)
  
  // Trailing slashes for cleaner URLs
  trailingSlash: true,
  
  // Image optimization
  images: {
    // Allow images from common domains if needed
    remotePatterns: [],
  },
};

module.exports = nextConfig;
