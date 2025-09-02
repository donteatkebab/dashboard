"use client"
import React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useFilters } from "@/contexts/FilterContext"
import useSWR from "swr"
import { Button } from "./ui/button"

import { Category } from "@/types/category"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProductsFilter() {
  return (
    <div>
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="p-2 flex flex-row gap-4 items-center">
          <Search />
          <SortProducts />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="p-2">
          <ListCategories />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

function Search() {
  const { filters, setFilters } = useFilters()

  return (
    <Input
      placeholder="Search products..."
      value={filters.search}
      onChange={(e) =>
        setFilters((prev) => ({ ...prev, search: e.target.value }))
      }
      className="w-64"
    />
  )
}


function ListCategories() {
  const { filters, setFilters } = useFilters()

  const { data: categories, isLoading } = useSWR("/api/categories", fetcher)

  if (isLoading) return <div>Loading...</div>
  if (categories.error) return <div>Failed to load categories!</div>

  return (
    <div className="flex flex-row gap-2">
      {categories && categories.length >= 0 ? (
        <>
          <Button
            variant={filters.category === null ? "default" : "outline"}
            onClick={() => setFilters((prev) => ({ ...prev, category: null }))}
          >
            All
          </Button>
          {categories.map((category: Category) => (
            <Button
              key={category.id}
              variant={filters.category === category.name ? "default" : "outline"}
              onClick={() => setFilters((prev) => ({ ...prev, category: category.name }))}
            >
              {category.name}
            </Button>
          ))}
        </>
      ) : (<p>No category in db!</p>)}
    </div>
  )
}

export function SortProducts() {
  const { filters, setFilters } = useFilters()

  console.log(filters)

  return (
    <div className="w-[180px]">
      <Select
        value={filters.sort}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, sort: value }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="name-asc">Name: A → Z</SelectItem>
          <SelectItem value="name-desc">Name: Z → A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}