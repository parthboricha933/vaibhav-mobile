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
    return NextResponse.json(phones)
  } catch (error) {
    console.error('Error fetching phones:', error)
    return NextResponse.json({ error: 'Failed to fetch phones' }, { status: 500 })
  }
}

// POST new phone
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, imageURL } = body

    if (!name || !description || !price || !imageURL) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const code = await generateUniqueCode()

    const phone = await db.phone.create({
      data: {
        name,
        description,
        price,
        imageURL,
        code,
      },
    })

    return NextResponse.json(phone, { status: 201 })
  } catch (error) {
    console.error('Error creating phone:', error)
    return NextResponse.json({ error: 'Failed to create phone' }, { status: 500 })
  }
}
