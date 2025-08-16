"use client"
import React, { useState, useEffect } from "react"

import FormModal from "@/components/form/FormModal"
import ProductForm from "@/components/form/ProductForm"

import { Product } from "@/types/product"

import { DataTable } from "@/components/table/data-table"
import { productColumn } from "./productColumn"

const page = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const getProducts = async () => {
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
    <div>
      <DataTable columns={productColumn} data={products}>
        <FormModal title="Create Product" triggerTitle="Create Product">
          <ProductForm />
        </FormModal>
      </DataTable>
    </div>
  )
}

export default page