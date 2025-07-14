import { Metadata } from 'next'

interface PageMetadataProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  locale: string
  type?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  locale,
  type = 'website'
}: PageMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      type: type as 'website' | 'article',
      title,
      description,
      images: [{ url: `${baseUrl}${image}` }],
      locale,
      siteName: 'Gas Spring Solutions'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
    }
  }
}