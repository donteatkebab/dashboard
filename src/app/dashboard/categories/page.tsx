"use client"
import React, { useState, useEffect } from "react"

import FormModal from "@/components/form/FormModal"
import CategoryForm from "@/components/form/CategoryForm"

import { Category } from "@/types/category"

import { DataTable } from "@/components/table/data-table"
import { categoryColumn } from "./categoryColumn"

const page = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data)
        setIsLoading(false)
      } catch {
        console.log("error getting categories")
        setIsLoading(false)
      }
    }

    getCategories()
  }, [])

  return (
    <div>
      <DataTable columns={categoryColumn} data={categories} isLoading={isLoading}>
        <FormModal title="Create Category" triggerTitle="Create Category">
          <CategoryForm />
        </FormModal>
      </DataTable>
    </div>
  )
}

export default page