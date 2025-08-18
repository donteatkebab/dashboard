"use client"

import {
  ColumnDef,
  flexRender,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { DataTablePagination } from "@/components/table/DataTablePagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  error: any
  isLoading: boolean
  children: React.ReactNode
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  error,
  isLoading,
  children
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      columnFilters,
      sorting,
    },
  })

  return (
    <div>
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center">
          <Input
            placeholder="Search name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              const value = event.target.value
              table.setColumnFilters([
                { id: "name", value }
              ])
            }}
            className="max-w-sm"
          />
        </div>
        <div>
          {children}
        </div>
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={header.column.columnDef.meta?.className}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isLoading ? (
                    <>Loading...</>
                  ) : error ? (
                    <>Error getting data.</>
                  ) : data && data.length === 0 ? (
                    <>No results.</>
                  ) : null}
                </TableCell>
              </TableRow>

            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination comp */}
      <DataTablePagination table={table} />
    </div>
  )
}