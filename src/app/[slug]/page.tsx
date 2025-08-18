"use client"
import React from "react"
import useSWR from "swr"
import { useParams } from "next/navigation"
import { Product } from "@/types/product"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data, error, isLoading } = useSWR<Product>(
    slug ? `/api/products/${slug}` : null,
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>

  return (
    <div>
      <p>id: {data?.id}</p>
      <h1>name: {data?.name}</h1>
      <p>description: {data?.description !== "" ? data?.description : "no description"}</p>
      <p>short description: {data?.shortDescription !== "" ? data?.shortDescription : "no short description"}</p>
      <p>${data?.price}</p>
    </div>
  )
}
