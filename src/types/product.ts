import { Category } from "./category"

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  category: Category
  image: string
  shortDescription?: string
  description?: string
  inStock: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}