/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@splinetool/react-spline", "@splinetool/runtime"],

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  /** Voorkom dat HTML lang in de browser/CDN blijft hangen met oude chunk-hashes na een deploy. */
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" }],
      },
      {
        source: "/portfolio-voorbeelden/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" }],
      },
      {
        source: "/:path((?!_next/static|_next/image|_next/webpack|favicon.ico|icon.png|apple-icon.png|assets).*)*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=0, must-revalidate, stale-while-revalidate=0",
          },
          { key: "CDN-Cache-Control", value: "max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
