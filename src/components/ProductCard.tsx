"use client"
import React from "react"
import { Product } from "@/types/product"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product }) {

  return (
    <Link href={`${product.slug}`}>
      <Card className="overflow-hidden pt-0 pb-2 rounded-2xl duration-200 gap-2 cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />

          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="secondary">
                Featured
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
        <CardHeader className="px-2">
          <CardTitle className="line-clamp-1 text-lg font-semibold break-words">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-2 flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">${product.price}</span>
          </p>
          <Badge className="capitalize line-clamp-1 break-words" variant="secondary">
            {product.category.name}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
