import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../Styles/globals.scss'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Lawpath Tech Test',
  description: 'Lawpath Tech Test by Madan Rijal Magar'
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  )
}
