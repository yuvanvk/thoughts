/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  transpilePackages: ["@workspace/db"],
  images: {
    remotePatterns: [new URL("https://hogivzhzbulvwzrahhjx.supabase.co/**"), new URL("https://dqy38fnwh4fqs.cloudfront.net/**")]
  }
}

export default nextConfig
