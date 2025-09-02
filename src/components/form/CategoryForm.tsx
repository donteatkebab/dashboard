"use client"
import React, { useState } from "react"
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
import { DialogClose } from "../ui/dialog"
import { toast } from "sonner"

import { Loader2Icon } from "lucide-react"

import { mutate } from "swr"

const formSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters." }),
  slug: z.string().min(4, { message: "Slug must be at least 4 characters." }),
  image: z.string(),
})

const CategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      image: "/placeholder.svg",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("Failed to create category")

      toast("Category created!")

      form.reset()

      mutate("/api/categories")

    } catch (err) {
      toast(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Shoes" {...field} />
              </FormControl>
              <FormDescription>Category display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="shoes" {...field} />
              </FormControl>
              <FormDescription>Used in URLs</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
            ) : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CategoryForm
