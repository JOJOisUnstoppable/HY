import Image from 'next/image'
//import Link from 'next/link'
//import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BentoCard } from "@/components/magicui/bento-grid"
import { GearIcon, LightningBoltIcon } from "@radix-ui/react-icons"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description: string
    image: string
    images?: string[] // 可选：所有图片路径
  }
  locale: string
  viewMore: string
}

export function CategoryCard({ category, locale, viewMore }: CategoryCardProps) {
  // 如果需要，可以在这里添加图片轮播或其他逻辑
  const displayImage = category.image || (category.images && category.images[0]) || '/images/placeholder.jpg'
  
  return (
    <BentoCard
      key={category.id}
      name={category.name}
      description={category.description}
      className="col-span-1 relative overflow-hidden group"
      Icon={category.id === 'gas-spring' ? LightningBoltIcon : GearIcon}
      href={`/${locale}/products/category/${category.id}`}
      cta={viewMore}
      background={
        <div className="absolute inset-0 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative w-full aspect-square before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-white/90 before:z-[1] before:pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full pb-[20px]">
                <Image
                  src={displayImage}
                  alt={category.name}
                  fill
                  className="object-contain transition-all duration-500 ease-out group-hover:scale-105 translate-y-[-75px]"
                  style={{ objectPosition: 'center center' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}