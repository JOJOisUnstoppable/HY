
import { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { getProductById } from '@/lib/products'
import ProductDetailPage from '@/components/products/ProductsDetail';

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

  const productData = await getProductById(locale, id)
  const dict = await getDictionary(locale)
  console.log("productData:", productData);
  console.log("productID:", id);

  // 处理产品未找到的情况
  if (!productData) {
    return <div>Product not found</div>
  }

  // 转换数据结构以匹配 ProductDetailPage 的期望
  const product = {
    title: productData.title,
    description: productData.description,
    image: productData.image,
  }

  return (
    <ProductDetailPage
      product={product}
      dict={dict}
      locale={locale}
    />
  )
}