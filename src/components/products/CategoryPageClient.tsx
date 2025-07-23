'use client'

import { ProductCard } from '@/components/products/ProductCard'
import { ProductHero } from '@/components/products/ProductHero'
import FastenersPage from '@/components/products/landingpage/fasteners'
import { Locale } from '@/lib/i18n/config'

interface CategoryPageClientProps {
  category: any
  products: any[]
  dict: any
  locale: Locale
}

export default function CategoryPageClient({ 
  category, 
  products, 
  dict, 
  locale 
}: CategoryPageClientProps) {
  return (
    <>
      <ProductHero 
        title={category.title}
        description={category.description}
        image={category.image}
        dict={dict}
        locale={locale}
      />

      {/* 文字部分 */}
      <div className="mb-12 border-2 border-red-500">
        <FastenersPage />
      </div>

      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                description: product.description,
                images: [product.image]
              }}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </>
  )
}