"use client"
import React from "react"
import { Product } from "@/types/product"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductCard({ product }: { product: Product }) {

  return (
    <Card className="overflow-hidden pt-0 pb-2 rounded-2xl duration-200 gap-2">
      <div className="relative w-full h-48">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-primary dark:bg-accent dark:text-accent-foreground">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>


      <CardHeader className="px-2">
        <CardTitle className="line-clamp-2 text-lg font-semibold break-words">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">${product.price}</span>
        </p>
        <p className="capitalize">Category: {product.category.name}</p>
      </CardContent>
    </Card>
  )
}
