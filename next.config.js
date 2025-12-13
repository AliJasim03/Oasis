/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zknxoyyujlsupqsqesfd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
