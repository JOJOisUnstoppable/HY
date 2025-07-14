import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Locale } from './i18n/config'

interface ProductCategory {
  id: string
  title: string
  description: string
  image: string
  order: number
}

interface Product {
  id: string
  title: string
  description: string
  category: string
  image: string
}

interface ProductData {
  categories: ProductCategory[]
  items: Product[]
  content: string
}

export async function getProductData(locale: Locale): Promise<ProductData> {
  const filePath = path.join(process.cwd(), 'content', 'products', locale, 'categories.md')
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  
  return {
    categories: data.categories || [],
    items: data.items || [],
    content
  }
}

export async function getProductsByCategory(locale: Locale, categoryId: string): Promise<Product[]> {
  const { items } = await getProductData(locale)
  return items.filter(item => item.category === categoryId)
}

/**
 * 根据产品ID获取产品数据
 * @param locale - 语言区域设置
 * @param productId - 产品ID
 * @returns 返回指定ID的产品数据，如果未找到则返回undefined
 */
export async function getProductById(locale: Locale, productId: string): Promise<Product | undefined> {
  const { items } = await getProductData(locale)
  return items.find(item => item.id === productId)
}