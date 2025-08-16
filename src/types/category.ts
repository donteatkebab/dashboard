import { Product } from "./product"

export interface Category {
  id: number
  slug: string
  name: string
  image: string
  products?: Product[]
  createdAt: Date
  updatedAt: Date
}