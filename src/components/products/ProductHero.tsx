import Image from 'next/image'
import Link from 'next/link'

interface ProductHeroProps {
  title: string
  description: string
  image: string
  dict: {
    common: {
      home: string
      products: string
    }
  }
  locale: string
}

export function ProductHero({ title, description, image, dict, locale }: ProductHeroProps) {
  return (
    <div className="relative h-[30vh] overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 内容 */}
      <div className="relative container h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white space-y-4">
          <h1 className="flex items-baseline gap-2 text-4xl md:text-5xl font-bold">
            <Link 
              href={`/${locale}`} 
              className="text-lg md:text-xl hover:text-gray-200 transition-colors font-light"
            >
              {dict.common.home}
            </Link>
            <span className="text-lg md:text-xl opacity-60">&gt;</span>
            <Link 
              href={`/${locale}/products`} 
              className="text-lg md:text-xl hover:text-gray-200 transition-colors font-light"
            >
              {dict.common.products}
            </Link>
            <span className="text-lg md:text-xl opacity-60">&gt;</span>
            {title}
          </h1>
          <p className="text-lg md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}