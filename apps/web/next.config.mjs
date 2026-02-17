/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hogivzhzbulvwzrahhjx.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dqy38fnwh4fqs.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

