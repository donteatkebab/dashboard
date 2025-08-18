"use client"
import React, { useState, useEffect } from "react"

import FormModal from "@/components/form/FormModal"
import CategoryForm from "@/components/form/CategoryForm"
import { Category } from "@/types/category"
import { DataTable } from "@/components/table/data-table"
import { categoryColumn } from "./categoryColumn"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())


const page = () => {
  const { data: categories, error, isLoading } = useSWR<Category[]>("/api/categories", fetcher)

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

export default page