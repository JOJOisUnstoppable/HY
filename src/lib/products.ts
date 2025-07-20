import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Locale } from './i18n/config'

interface ProductCategory {
  id: string
  title: string
  description: string
  image: string
  images: string[] // 新增：存储所有图片路径
  order: number
}

interface Product {
  id: string
  title: string
  description: string
  category: string
  image: string
  images: string[]
}

// 添加 Feature 接口
interface Feature {
  id: number
  name: string
  description: string
  icon: React.ReactNode
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
  
  // 处理categories的image字段 - categories是单个图片路径
  const processedCategories = (data.categories || []).map((category: any) => ({
    ...category,
    images: category.image ? [category.image.trim()] : [], // categories只有一张图片
    image: category.image ? category.image.trim() : '' // 直接使用原始路径
  }))
  
  // 处理items的image字段 - items是逗号分隔的多个图片路径
  const processedItems = (data.items || []).map((item: any) => ({
    ...item,
    images: item.image ? item.image.split(',').map((img: string) => img.trim()) : [],
    image: item.image ? item.image.split(',')[0].trim() : '' // 使用第一张图片作为主图
  }))
  
  return {
    categories: processedCategories,
    items: processedItems,
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