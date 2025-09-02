import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const search = searchParams.get("search") || undefined
    const category = searchParams.get("category") || undefined
    const sort = searchParams.get("sort") || "newest"
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    const products = await prisma.product.findMany({
      where: {
        AND: [
          search ? { name: { contains: search, mode: "insensitive" } } : {},
          category ? { category: { name: category } } : {},
          minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
        ],
      },
      orderBy:
        sort === "price-asc"
          ? { price: "asc" }
          : sort === "price-desc"
            ? { price: "desc" }
            : sort === "name-asc"
              ? { name: "asc" }
              : sort === "name-desc"
                ? { name: "desc" }
                : sort === "oldest"
                  ? { createdAt: "asc" }
                  : { createdAt: "desc" },
      include: { category: true },
    })

    return NextResponse.json(products)
  } catch (err) {
    console.error("Error fetching products:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
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
