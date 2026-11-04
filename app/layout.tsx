import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Lumière — Global Box Office & Franchise Intelligence',
  description:
    'A premium box office intelligence platform for the film industry. Explore worldwide, Indian, and Malayalam cinema grosses and the highest-grossing media franchises of all time.',
  generator: 'v0.app',
  keywords: [
    'box office',
    'film industry',
    'highest grossing movies',
    'Indian cinema',
    'Malayalam cinema',
    'media franchises',
    'film analytics',
  ],
  openGraph: {
    title: 'Lumière — Global Box Office & Franchise Intelligence',
    description:
      'Premium box office intelligence for the film industry. Worldwide, Indian, and Malayalam cinema plus the biggest media franchises.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a08',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
