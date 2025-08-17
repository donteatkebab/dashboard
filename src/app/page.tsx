"use client"
import React, { useState, useEffect } from "react"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"

const page = () => {
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        setProducts(data)
      } catch {
        console.log("error getting products")
      }
    }

    getProducts()
  }, [])

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