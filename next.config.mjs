/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com'
            },
            {
                protocol: 'https',
                hostname: 'self-checkout-tau.vercel.app'
            }
        ]
    }
};

export default nextConfig;
