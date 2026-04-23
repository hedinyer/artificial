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
        <a
          href="https://wa.me/573171053785"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-95 sm:bottom-6 sm:right-6 sm:h-[3.75rem] sm:w-[3.75rem]"
          aria-label="Escribir por WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-7 w-7 sm:h-8 sm:w-8"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.78 3.1 1.19 4.75 1.2h.08c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.15-2.9-7.01a9.82 9.82 0 0 0-7-2.9zm.04 17.9h-.01c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a7.6 7.6 0 0 1-1.16-3.99c0-4.2 3.42-7.63 7.64-7.63 2.04 0 3.95.8 5.4 2.25a7.6 7.6 0 0 1 2.24 5.4c0 4.2-3.42 7.63-7.64 7.64zm4.2-5.4c-.23-.12-1.35-.66-1.55-.74-.2-.08-.35-.12-.5.12-.15.24-.55.74-.68.9-.12.15-.25.16-.48.05-.22-.12-1.35-.5-2.57-1.6-.95-.85-1.6-1.9-1.78-2.22-.2-.3-.02-.47.15-.63.16-.16.35-.4.5-.6.12-.2.12-.32.18-.5.05-.2 0-.35-.1-.5-.1-.12-.5-1.2-.68-1.65-.18-.45-.4-.4-.5-.4h-.42c-.2 0-.5.05-.75.4-.25.3-.95.92-.95 2.25 0 1.32.97 2.6 1.1 2.8.12.2 1.9 2.9 4.6 4.04.64.28 1.15.45 1.55.6.64.2 1.22.17 1.68.1.5-.05 1.5-.6 1.7-1.2.2-.6.2-1.12.15-1.2-.1-.1-.2-.12-.4-.2z" />
          </svg>
        </a>
      </body>
    </html>
  )
}
