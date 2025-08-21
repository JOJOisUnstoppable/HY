import './globals.css'
import type { Metadata } from 'next'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  title: 'Fasteners Solutions',
  description: 'Professional Precision Industrial Component Solutions for Global Manufacturing',
  icons: {
    icon: '/logoWithDK.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 right-0 p-4">
        </header>
        {children}
      </body>
    </html>
  )
}
