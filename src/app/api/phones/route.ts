import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

function generate4DigitCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

async function generateUniqueCode(): Promise<string> {
  let code = generate4DigitCode()
  let existing = await db.phone.findUnique({ where: { code } })
  let attempts = 0
  while (existing && attempts < 100) {
    code = generate4DigitCode()
    existing = await db.phone.findUnique({ where: { code } })
    attempts++
  }
  return code
}

// GET all phones
export async function GET() {
  try {
    const phones = await db.phone.findMany({
      orderBy: { createdAt: 'desc' },
    })
    // Parse images JSON string for each phone
    const phonesWithImages = phones.map((phone) => ({
      ...phone,
      images: JSON.parse(phone.images),
    }))
    return NextResponse.json(phonesWithImages)
  } catch (error) {
    console.error('Error fetching phones:', error)
    return NextResponse.json({ error: 'Failed to fetch phones' }, { status: 500 })
  }
}

// POST new phone
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, images } = body

    if (!name || !description || !price || !images) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // images can be either an array or a JSON string
    const imagesArray = typeof images === 'string' ? JSON.parse(images) : images
    if (!Array.isArray(imagesArray) || imagesArray.length === 0) {
      return NextResponse.json({ error: 'At least one image is required' }, { status: 400 })
    }

    const code = await generateUniqueCode()

    const phone = await db.phone.create({
      data: {
        name,
        description,
        price,
        images: JSON.stringify(imagesArray),
        code,
      },
    })

    return NextResponse.json(
      { ...phone, images: imagesArray },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating phone:', error)
    return NextResponse.json({ error: 'Failed to create phone' }, { status: 500 })
  }
}
