"use client"
import React from "react"

import FormModal from "@/components/form/FormModal"
import ProductForm from "@/components/form/ProductForm"
import { Product } from "@/types/product"
import { DataTable } from "@/components/table/data-table"
import { productColumn } from "./productColumn"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProductWrapper() {
  const { data: products, error, isLoading } = useSWR<Product[]>("/api/products", fetcher)

  return (
    <div>
      <DataTable columns={productColumn} data={products ?? []} error={error} isLoading={isLoading}>
        <FormModal title="Create Product" triggerTitle="Create Product">
          <ProductForm />
        </FormModal>
      </DataTable>
    </div>
  )
}

