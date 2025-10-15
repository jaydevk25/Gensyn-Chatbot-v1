import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gensyn AI ChatBot',
  description: 'AI-powered chatbot for Gensyn network - decentralized machine learning',
  icons: {
    icon: 'https://cdn.prod.website-files.com/66bc6da8fe284e4693088ff7/66bc6da8fe284e4693088ffe_Gensyn-Symbol.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gensyn-dark text-white`}>
        {children}
      </body>
    </html>
  )
}
