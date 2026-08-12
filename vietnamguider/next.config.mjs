import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Let .mdx files act as pages/components alongside .ts/.tsx
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
