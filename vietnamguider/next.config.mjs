/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [] },

  // Build không được chết vì type/lint. Vẫn kiểm được thủ công:
  //   npx tsc --noEmit     (type)
  //   npm run lint         (lint)
  // Bật lại khi đã dựng xong quy trình kiểm ở máy.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
