"use client"
import React from "react"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import useSWR from "swr"
import { useFilters } from "@/contexts/FilterContext"


const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ListProducts() {
  const { filters } = useFilters()

  const query = new URLSearchParams()
  if (filters.search) query.set("search", filters.search)
  if (filters.category) query.set("category", filters.category)
  if (filters.price.min) query.set("minPrice", filters.price.min.toString())
  if (filters.price.max) query.set("maxPrice", filters.price.max.toString())
  if (filters.sort) query.set("sort", filters.sort)

  const { data: products, isLoading } = useSWR(
    `/api/products?${query.toString()}`,
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (products.error) return <div>Failed to load products!</div>

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products && products.length >= 0 ? (products.map((product: Product) => (
        <div key={product.id} className="break-inside-avoid mb-2">
          <ProductCard product={product} />
        </div>
      ))) : (
        <div>
          No product in db!
        </div>
      )}
    </div>
  )
}