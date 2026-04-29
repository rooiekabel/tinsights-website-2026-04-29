/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/portfolio-voorbeelden/live/crypgo" : "",
  assetPrefix: isProd ? "/portfolio-voorbeelden/live/crypgo/" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

 