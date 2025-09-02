"use client"
import React from "react"

import FormModal from "@/components/form/FormModal"
import CategoryForm from "@/components/form/CategoryForm"
import { Category } from "@/types/category"
import { DataTable } from "@/components/table/data-table"
import { categoryColumn } from "./categoryColumn"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function CategoryWrapper() {
  const { data: categories, isLoading, error } = useSWR<Category[]>("/api/categories", fetcher)

  return (
    <div>
      <DataTable columns={categoryColumn} data={categories ?? []} error={error} isLoading={isLoading}>
        <FormModal title="Create Category" triggerTitle="Create Category">
          <CategoryForm />
        </FormModal>
      </DataTable>
    </div>
  )
}

