/** @type {import('next').NextConfig} */
import { resolve } from 'path';

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Use require for path instead of async import
    config.resolve.alias['ethers/lib/utils'] = resolve('./utils/ethers-compat.js');
    
    // Don't modify the devtool in development
    // This avoids the warning about performance regressions
    
    return config;
  },
};

export default nextConfig;