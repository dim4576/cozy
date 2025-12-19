import type { Metadata } from 'next'
import './globals.css'

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Cozy Space'
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Cozy Space - Разработка сайтов и программ в Пинске, Бресте, Минске'
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Разработка сайтов в Пинске, Бресте, Минске. Создание программного обеспечения, мобильных приложений и прошивок для микроконтроллеров.'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cozyspace.dev'
const keywords = process.env.NEXT_PUBLIC_SITE_KEYWORDS || 'разработка сайтов Пинск, разработка сайтов Брест, разработка сайтов Минск, разработка программного обеспечения'

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: keywords.split(', '),
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.avif?v=2', type: 'image/avif' },
      { url: '/favicon.avif?v=2', type: 'image/avif' },
    ],
    apple: [
      { url: '/icon.avif?v=2', type: 'image/avif' },
    ],
    shortcut: '/icon.avif?v=2',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
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
  verification: {
    // Добавьте здесь коды верификации для Google Search Console и Яндекс.Вебмастер
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/icon.avif?v=2" type="image/avif" />
        <link rel="apple-touch-icon" href="/icon.avif?v=2" />
        <link rel="shortcut icon" href="/icon.avif?v=2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: siteName,
              description: siteDescription,
              url: siteUrl,
              telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
              email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Пинск',
                addressRegion: 'Брестская область',
                addressCountry: 'BY',
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Пинск',
                },
                {
                  '@type': 'City',
                  name: 'Брест',
                },
                {
                  '@type': 'City',
                  name: 'Минск',
                },
                {
                  '@type': 'Country',
                  name: 'Беларусь',
                },
              ],
              priceRange: '$$',
              serviceType: [
                'Разработка сайтов',
                'Разработка программного обеспечения',
                'Разработка мобильных приложений',
                'Разработка прошивок для микроконтроллеров',
                'UI/UX дизайн',
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

