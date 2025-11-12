/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // App Router 사용 시 Pages Router 관련 체크 비활성화
  },
  // 빌드 시 타입 체크만 수행하고 런타임 에러는 무시
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
