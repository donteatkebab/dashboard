"use client"

import { createContext, useContext, useState } from "react"

type Filters = {
  search: string
  category: string | null
  price: { min: number | null; max: number | null }
  sort: string
}

const defaultFilters: Filters = {
  search: "",
  category: null,
  price: { min: null, max: null },
  sort: "",
}

const FilterContext = createContext<{
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}>({ filters: defaultFilters, setFilters: () => { } })

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  return useContext(FilterContext)
}
