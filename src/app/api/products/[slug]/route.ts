import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await params

    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true }
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (err) {
    console.error("Error fetching product:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
