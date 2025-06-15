/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https',
                hostname: 'place-hold.it',
            },
            {
                protocol: 'https',
                hostname: 'placeholder.pics',
            },
        ],
    },
}

module.exports = nextConfig
