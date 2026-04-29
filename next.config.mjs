/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@splinetool/react-spline", "@splinetool/runtime"],

  /** Voorkom dat HTML lang in de browser/CDN blijft hangen met oude chunk-hashes na een deploy. */
  async headers() {
    return [
      {
        source: "/:path((?!_next/static|_next/image|_next/webpack|favicon.ico|icon.png|apple-icon.png|assets).*)*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
