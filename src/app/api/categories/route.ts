import { prisma } from "@/lib/prisma"
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
  } catch (err) {
    console.error("Error fetching categories:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.name || !body.slug || !body.image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        image: body.image,
      },
    })

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json()

  if (!body.id) {
    return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: body.id },
      data: {
        name: body.name,
        slug: body.slug,
        image: body.image,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error: any) {
    console.error(error)
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}


// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
  }

  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json(deletedCategory)
  } catch (error: any) {
    console.error(error)
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

