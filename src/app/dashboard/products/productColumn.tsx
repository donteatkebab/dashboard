"use client"
import React from "react"
import Image from "next/image"

import { ColumnDef } from "@tanstack/react-table"

import { Product } from "@/types/product"

import {
  MoreHorizontal,
  Check,
  X
} from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { Category } from "@/types/category"

export const productColumn: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { className: "w-[80px] px-2" },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original

      return (
        <Image
          src={product.image}
          alt={product.name}
          width={50}
          height={50}
          className="rounded-lg"
        />
      )
    },
    meta: { className: "w-[160px] px-2" },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Price" />
    },
    cell: ({ row }) => {
      const value: number = row.getValue("price")
      return `$${value.toFixed(2)}`
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Category" />
    },
    cell: ({ row }) => {
      const value: Category = row.getValue("category")
      return value.name
    },
  },
  {
    accessorKey: "inStock",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Stock" />
    },
    cell: ({ row }) => {
      const value: boolean = row.getValue("inStock")
      return value ? <Check size={16} /> : <X size={16} />
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id.toString())}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    meta: { className: "text-right w-[1%] whitespace-nowrap" },
  }
]