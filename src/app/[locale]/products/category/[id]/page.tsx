
import { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductHero } from '@/components/products/ProductHero'
import { getProductData, getProductsByCategory } from '@/lib/products'
import { notFound } from 'next/navigation'
import CategoryPageClient from '@/components/products/CategoryPageClient'

export default async function CategoryPage(
  props: {
    params: Promise<{ locale: Locale; id: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const { categories } = await getProductData(locale)
  const products = await getProductsByCategory(locale, id)
  const dict = await getDictionary(locale)

  const category = categories.find(cat => cat.id === id)
  if (!category) {
    notFound()
  }

  return (
    <CategoryPageClient 
      category={category}
      products={products}
      dict={dict}
      locale={locale}
    />
  )
}