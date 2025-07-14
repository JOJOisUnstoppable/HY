import Image from 'next/image'
import Link from 'next/link'

interface BlogTagHeroProps {
  //title: string
  tag: string
  image?: string
  locale: string
  dict: {
    common: {
      home: string
      blog: string
    }
    blog: {
      tags: string
      backToBlog: string
    }
  }
}

export function BlogTagHero({ 
  //title, 
  tag, 
  image = '/images/blog-tag-hero-bg.jpg',
  locale,
  dict
}: BlogTagHeroProps) {
  return (
    <div className="relative h-[30vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={tag}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative container h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white space-y-4">
          <div className="flex items-baseline gap-2 text-lg md:text-xl font-light">
            <Link 
              href={`/${locale}`} 
              className="hover:text-gray-200 transition-colors"
            >
              {dict.common.home}
            </Link>
            <span className="opacity-60">&gt;</span>
            <Link 
              href={`/${locale}/blog`} 
              className="hover:text-gray-200 transition-colors"
            >
              {dict.common.blog}
            </Link>
            <span className="opacity-60">&gt;</span>
            <Link 
              href={`/${locale}/blog/tag`} 
              className="hover:text-gray-200 transition-colors"
            >
              {dict.blog.tags}
            </Link>
            <span className="opacity-60">&gt;</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            {tag}
          </h1>
        </div>
      </div>
    </div>
  )
}