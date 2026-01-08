/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better SEO
  output: 'export',
  
  // Trailing slashes for cleaner URLs
  trailingSlash: true,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

