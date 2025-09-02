import React from "react"
import ListProducts from "@/components/ListProducts"
import ProductsFilter from "@/components/ProductsFilter"
import { FilterProvider } from "@/contexts/FilterContext"

export default function page() {
  return (
    <>
      <FilterProvider>
        <ProductsFilter />
        <ListProducts />
      </FilterProvider>
    </>
  )
}