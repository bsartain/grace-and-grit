const nextConfig = {
  eslint: {
    // Only run ESLint on these directories during production builds
    dirs: ["app", "components"],
    // Don't fail build on warnings
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail build on type errors (only if needed)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
