/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // SPA-ish behavior: we keep everything client-side, but still benefit from Next's routing and bundling.
  // If you later add server actions/routes, this config won't fight you.
};

export default nextConfig;
