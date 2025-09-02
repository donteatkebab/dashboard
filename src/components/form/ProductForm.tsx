"use client"
import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { DialogClose } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Category } from "../../types/category"

import { Loader2Icon } from "lucide-react"

import { mutate } from "swr"

const formSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters." }),
  slug: z.string().min(4, { message: "Slug must be at least 4 characters." }),
  price: z.coerce.number().positive({ message: "price must be positive." }),
  categoryId: z.coerce.number().int({ message: "Category ID must be an integer." }),
  image: z.string().min(1, { message: "At least one image URL is required." }),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
})

const ProductForm = () => {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data)
      } catch {
        console.log("error getting categories")
      }
    }

    getCategories()
  }, [])

  type FormValues = {
    name: string
    slug: string
    price: string
    categoryId: string
    image: string
    description?: string
    shortDescription?: string
    inStock: boolean
    featured: boolean
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      slug: "",
      price: "",
      categoryId: "",
      image: "/placeholder.svg",
      description: "",
      shortDescription: "",
      inStock: true,
      featured: false,
    },
  })


  async function onSubmit(values: z.input<typeof formSchema>) {
    try {
      setIsLoading(true)
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("Failed to create product")

      toast("Product created!")

      form.reset()

      mutate("/api/products")

    } catch (err) {
      toast(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Red Shoes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="red-shoes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="99.99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category ID */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories && categories.length >= 0 ? (categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                      ))) : (
                        <div>
                          No category in db!
                        </div>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  value="/placeholder.svg"
                />
              </FormControl>
              <FormDescription>Prototype mode – placeholder is in use.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Description */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Quick summary of the product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Full description of the product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* In Stock */}
        <div className="flex flex-row space-x-4">
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>In Stock</FormLabel>
              </FormItem>
            )}
          />

          {/* Featured */}
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Featured</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2Icon className="animate-spin" />
                Please wait
              </>
            ) : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
