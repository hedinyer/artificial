import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'art_ificial - Experiences made by humans',
  description: 'Tu negocio merece destacar. No solo funcionar. Impulsa tu productividad, domina tus datos y construye productos que te posicionen como único, no genérico.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Preload critical GIFs for optimal loading experience */}
        <link rel="preload" href="/1.png" as="image" type="image/png" />
        <link rel="preload" href="/gifs/uiux.gif" as="image" type="image/gif" />
        
        {/* Prefetch secondary GIFs */}
        <link rel="prefetch" href="/gifs/branding.gif" as="image" type="image/gif" />
        <link rel="prefetch" href="/gifs/inteligencia.gif" as="image" type="image/gif" />
        
        {/* Optimize resource hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
