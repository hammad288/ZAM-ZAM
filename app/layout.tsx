import type { Metadata } from 'next'
import './globals.css'
import { getSettings } from '@/lib/settings'

export async function generateMetadata(): Promise<Metadata> {
  let settings: Record<string, string> = {}
  try {
    settings = await getSettings()
  } catch {}

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: {
      default: 'ZAM ZAM Tours & Travels — Trusted Hajj & Umrah Services Since 1996',
      template: '%s | ZAM ZAM Tours & Travels',
    },
    description:
      'ZAM ZAM Tours & Travels — Your trusted partner for Hajj & Umrah packages since 1996. Premium Hajj packages, Umrah packages, visa assistance, hotel bookings in Makkah & Madinah.',
    keywords: [
      'Hajj packages',
      'Umrah packages',
      'Hajj tour operator',
      'Umrah visa',
      'Makkah hotel',
      'Madinah hotel',
      'ZAM ZAM Tours',
      'ZAM ZAM Travels',
      'pilgrimage',
      'Hajj 2025',
      'Umrah 2025',
      'Saudi Arabia Hajj',
      'Ramzan Umrah',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'ZAM ZAM Tours & Travels',
      title: 'ZAM ZAM Tours & Travels — Trusted Hajj & Umrah Services Since 1996',
      description:
        'Your trusted partner for Hajj & Umrah since 1996. Premium packages, visa assistance, hotel bookings in Makkah & Madinah.',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
