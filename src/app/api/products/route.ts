import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET
export async function GET() {
  const products = await prisma.product.findMany({ include: { category: true } })
  return NextResponse.json(products)
}

// POST
export async function POST(req: Request) {
  const body = await req.json()

  if (!body.name || !body.slug || !body.categoryId || !body.image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        slug: body.slug,
        name: body.name,
        price: body.price,
        categoryId: body.categoryId,
        image: body.image,
        description: body.description,
        shortDescription: body.shortDescription,
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
      },
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json()

  if (!body.id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: body.id },
      data: {
        slug: body.slug,
        name: body.name,
        price: body.price,
        categoryId: body.categoryId,
        image: body.image,
        description: body.description,
        shortDescription: body.shortDescription,
        inStock: body.inStock,
        featured: body.featured,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    console.error(error)
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(deletedProduct)
  } catch (error: any) {
    console.error(error)
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
