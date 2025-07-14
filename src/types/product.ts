export interface Product {
  id: string
  name: string
  category: string
  description: string
  features: string[]
  specifications: {
    [key: string]: string | number
  }
  images: string[]
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  image: string
  productCount: number
}