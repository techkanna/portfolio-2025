import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Senthilkannan - Lead React/Next.js Developer',
  description: 'Experienced React and Next.js developer with 6+ years of expertise in building modern web applications',
  keywords: 'React, Next.js, JavaScript, TypeScript, Frontend Developer, Web Developer',
  authors: [{ name: 'Senthilkannan' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
