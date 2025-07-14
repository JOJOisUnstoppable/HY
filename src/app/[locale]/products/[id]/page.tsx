
import { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'

import { getProductById } from '@/lib/products'


export default async function ProductPage(
  props: {
    params: Promise<{ locale: Locale; id: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const product = await getProductById(locale, id)
  const dict = await getDictionary(locale)

  return (
    <>
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p>{dict.common.products}</p>
        <p>{product?.title}</p>
        <span>Page Maintenance / 页面维护中</span>
      </div>
    </>
  )
}