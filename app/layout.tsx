import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: {
    default: 'Oasis Handmade Carpet Centre - Premium Persian, Afghan & Indian Carpets',
    template: '%s | Oasis Handmade Carpet Centre'
  },
  description: 'Discover exquisite handmade carpets from Persia, Afghanistan, and India. Over 30 years of excellence in traditional carpet craftsmanship. Located in Bahrain.',
  keywords: ['handmade carpets', 'Persian carpets', 'Afghan carpets', 'Indian carpets', 'traditional carpets', 'Bahrain carpets', 'luxury carpets'],
  authors: [{ name: 'Oasis Handmade Carpet Centre' }],
  creator: 'Oasis Handmade Carpet Centre',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_BH',
    url: '/',
    siteName: 'Oasis Handmade Carpet Centre',
    title: 'Oasis Handmade Carpet Centre - Premium Handmade Carpets',
    description: 'Discover exquisite handmade carpets from Persia, Afghanistan, and India. Over 30 years of excellence.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oasis Handmade Carpet Centre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oasis Handmade Carpet Centre',
    description: 'Premium handmade carpets from Persia, Afghanistan, and India',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#001F3F" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body>
        <LanguageProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
