import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
        NEXT_PUBLIC_FLASKAPI_URL: process.env.NEXT_PUBLIC_FLASKAPI_URL,
        AUTH_URL: process.env.AUTH_URL
    },
    images: {
        domains: ['localhost'], // Adicione o domínio local onde suas imagens estão sendo salvas
        // Se precisar de mais domínios remotos, adicione-os aqui
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com'
            },
            {
                protocol: 'https',
                hostname: 'haveibeenpwned.com'
            },
        ],
    },
};

export default withNextIntl(nextConfig);
