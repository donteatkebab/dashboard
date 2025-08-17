"use client"
import React, { useState, useEffect } from "react"

import FormModal from "@/components/form/FormModal"
import ProductForm from "@/components/form/ProductForm"

import { Product } from "@/types/product"

import { DataTable } from "@/components/table/data-table"
import { productColumn } from "./productColumn"

const page = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/products")
        const data = await res.json()
        setProducts(data)
        setIsLoading(false)
      } catch {
        console.log("error getting products")
        setIsLoading(false)
      }
    }

    getProducts()
  }, [])

  return (
    <div>
      <DataTable columns={productColumn} data={products} isLoading={isLoading}>
        <FormModal title="Create Product" triggerTitle="Create Product">
          <ProductForm />
        </FormModal>
      </DataTable>
    </div>
  )
}

export default page