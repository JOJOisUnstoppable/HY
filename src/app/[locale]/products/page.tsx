import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import { CategoryCard } from '@/components/products/CategoryCard'
import { getProductData } from '@/lib/products'
import { ProductAllHero } from '@/components/products/ProductAllHero'
import { BentoGrid } from "@/components/magicui/bento-grid"

export default async function ProductsPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;
  const { locale } = params;

  const dict = await getDictionary(locale)
  const { categories, content } = await getProductData(locale)

  return (
    <div>
      <ProductAllHero 
        title={dict.common.products}
        description={dict.home.hero.subtitle}
        image="/images/hero-bg.jpg"
        dict={dict}
        locale={locale}
      />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-gray-600 max-w-2xl mx-auto prose"
            dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        
        <BentoGrid className="grid-cols-1 lg:grid-cols-12 auto-rows-[310px] lg:auto-rows-[430px] [&>*]:transition-[grid-column] [&>*]:duration-500">
          {categories
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <CategoryCard
                key={category.id}
                category={{
                  id: category.id,
                  name: category.title,
                  description: category.description,
                  image: category.image, // 现在是处理后的第一张图片
                  images: category.images // 传递所有图片
                }}
                locale={locale}
                viewMore={dict.categoryViewMore}
              />
            ))}
        </BentoGrid>
      </div>
    </div>
  )
}