import '../globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Navbar } from '@/components/layout/Navbar'
import { getDictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/lib/i18n/config'
import { Toaster } from '@/components/ui/sonner'
import { getProductData } from '@/lib/products'
import { Footer } from '@/components/layout/Footer'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/shared/ScrollToTop'

const hubotSans = localFont({
  src: [
    {
      path: '../../../public/fonts/HubotSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/HubotSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/HubotSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-hubot-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
})

export const metadata: Metadata = {
  title: {
    default: 'Gas Spring Solutions',
    template: '%s | Gas Spring Solutions'
  },
  description: 'Professional Gas Spring Solutions for Global Manufacturing',
  keywords: ['gas spring', 'gas strut', 'gas lift', 'damper', 'industrial hardware'],
  authors: [{ name: 'Gas Spring Solutions' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.dkgasspring.com'),
  openGraph: {
    type: 'website',
    siteName: 'Gas Spring Solutions',
    title: 'Gas Spring Solutions',
    description: 'Professional Gas Spring Solutions for Global Manufacturing',
    images: '/images/og-image.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gas Spring Solutions',
    description: 'Professional Gas Spring Solutions for Global Manufacturing',
    images: '/images/og-image.jpg',
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Gas Spring Solutions",
      "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://www.dkgasspring.com',
      "logo": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`,
      "image": `${process.env.NEXT_PUBLIC_BASE_URL}/images/og-image.jpg`,
      "description": "Professional Gas Spring Solutions for Global Manufacturing",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": process.env.NEXT_PUBLIC_CONTACT_PHONE || "+86-xxx-xxxxxxxx",
        "contactType": "customer service",
        "areaServed": ["CN", "US", "EU"],
        "availableLanguage": ["en", "zh", "es", "de"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CN",
        "addressRegion": "Zhejiang",
        "addressLocality": "Ningbo"
      },
      "sameAs": [
        "https://www.facebook.com/dkgasspring",
        "https://twitter.com/dkgasspring",
        "https://www.linkedin.com/company/dkgasspring"
      ]
    })
  }
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  // 检查语言是否有效
  if (!['en', 'zh', 'es', 'de'].includes(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale)
  const { categories } = await getProductData(locale)

  return (
    <html lang={locale}>
      <body className={hubotSans.className}>
        <Navbar 
          locale={locale} 
          dict={dict} 
          categories={categories.map(cat => ({
            id: cat.id,
            title: cat.title,
            description: cat.description
          }))} 
        />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer 
          locale={locale}
          dict={dict}
          categories={categories.map(cat => ({
            id: cat.id,
            title: cat.title,
            description: cat.description
          }))}
        />
        <Toaster />
        <ScrollToTop />
      </body>
    </html>
  )
}