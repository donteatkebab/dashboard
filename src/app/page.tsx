"use client"
import React from "react"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

const page = () => {
  const { data: products, error, isLoading } = useSWR<Product[]>("/api/products", fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load products</div>

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 md:gap-4 pb-6">
      {!products ? (<div>there is not a product in database</div>) : products.length === 0
        ? (
          <div>there is not a product in database</div>
        )
        : products?.map((product: Product) => (
          <div key={product.id} className="break-inside-avoid mb-2">
            <ProductCard product={product} />
          </div>
        ))
      }
    </div>
  )
}

export default page