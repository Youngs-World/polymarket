/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → deploys as plain files to Cloudflare Pages, GitHub Pages, Vercel, anywhere.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
