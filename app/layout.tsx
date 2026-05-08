import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://artiificial.art'),
  title: {
    default: 'Agencia digital en Bucaramanga | Diseño, software e IA | art_ificial',
    template: '%s | art_ificial',
  },
  description:
    'Agencia digital en Bucaramanga, Colombia. Unimos diseño de marca, desarrollo web y automatización con IA para ayudarte a vender más y operar mejor.',
  keywords: [
    'agencia digital Bucaramanga',
    'agencia digital Medellín',
    'agencia digital Bogotá',
    'agencia digital Barranquilla',
    'agencia digital Cali',
    'digital agency Miami',
    'digital agency California',
    'digital agency Texas',
    'digital agency New York',
    'digitalagentur Berlin',
    'digitalagentur Hamburg',
    'diseño de marca Colombia',
    'desarrollo web Bucaramanga',
    'automatización con IA Colombia',
    'artificial art',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'es-CO': '/',
      en: '/?lang=en',
      de: '/?lang=de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://artiificial.art',
    siteName: 'art_ificial',
    title: 'Agencia digital en Bucaramanga | Diseño, software e IA',
    description:
      'Diseño, desarrollo y automatización en una sola agencia para empresas en Bucaramanga y Colombia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agencia digital en Bucaramanga | art_ificial',
    description:
      'Diseño, software y automatización con IA para empresas en Colombia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
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
