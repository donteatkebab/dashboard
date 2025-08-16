"use client"
import React from "react"
import { Product } from "@/types/product"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"

export default function ProductCard({ product }: { product?: Product }) {
  if (!product) return null

  return (
    <Card className="overflow-hidden pt-0 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative w-full h-48">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-primary dark:bg-accent dark:text-accent-foreground">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1 text-lg font-semibold">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">${product.price}</span>
        </p>
        <p className="capitalize">Category: {product.category.name}</p>
        <p className={product.inStock ? "text-green-600" : "text-red-600"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          View Product
        </Button>
      </CardFooter>
    </Card>
  )
}
