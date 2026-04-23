import { connectToDatabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

function generate4DigitCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

// GET all phones
export async function GET() {
  try {
    const db = await connectToDatabase()
    
    const phones = await db.collection('phones')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    const phonesWithId = phones.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }))
    
    return NextResponse.json(phonesWithId)
  } catch (error) {
    console.error('Error fetching phones:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch phones',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}

// POST new phone
export async function POST(request: NextRequest) {
  try {
    const db = await connectToDatabase()
    const body = await request.json()
    const { name, description, price, images } = body

    if (!name || !description || !price || !images) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const imagesArray = typeof images === 'string' ? JSON.parse(images) : images
    if (!Array.isArray(imagesArray) || imagesArray.length === 0) {
      return NextResponse.json({ error: 'At least one image is required' }, { status: 400 })
    }

    // Generate unique 4-digit code
    let code = generate4DigitCode()
    let attempts = 0
    while (attempts < 100) {
      const existing = await db.collection('phones').findOne({ code })
      if (!existing) break
      code = generate4DigitCode()
      attempts++
    }

    const phone = {
      name,
      description,
      price,
      images: imagesArray,
      code,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection('phones').insertOne(phone)

    return NextResponse.json(
      { id: result.insertedId.toString(), ...phone },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating phone:', error)
    return NextResponse.json({ 
      error: 'Failed to create phone',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}
