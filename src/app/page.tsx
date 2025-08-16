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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-6">
      {!products ? (<div>there is not a product in database</div>) : products.length === 0
        ? (
          <div>there is not a product in database</div>
        )
        : products.map((product: Product) => <ProductCard key={product.id} product={product} />)
      }
    </div>
  )
}

export default page