"use client"
import React, { useState, useEffect } from "react"

import FormModal from "@/components/form/FormModal"
import CategoryForm from "@/components/form/CategoryForm"

import { Category } from "@/types/category"

import { DataTable } from "@/components/table/data-table"
import { categoryColumn } from "./categoryColumn"

const page = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data)
      } catch {
        console.log("error getting categories")
      }
    }

    getCategories()
  }, [])

  return (
    <div>
      <DataTable columns={categoryColumn} data={categories}>
        <FormModal title="Create Category" triggerTitle="Create Category">
          <CategoryForm />
        </FormModal>
      </DataTable>
    </div>
  )
}

export default page