import { connectToDatabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

// GET single phone
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = await connectToDatabase()
    
    let phone
    try {
      phone = await db.collection('phones').findOne({ _id: new ObjectId(id) })
    } catch {
      // If not a valid ObjectId, try by code
      phone = await db.collection('phones').findOne({ code: id })
    }
    
    if (!phone) {
      return NextResponse.json({ error: 'Phone not found' }, { status: 404 })
    }
    
    const { _id, ...rest } = phone
    return NextResponse.json({ id: _id.toString(), ...rest })
  } catch (error) {
    console.error('Error fetching phone:', error)
    return NextResponse.json({ error: 'Failed to fetch phone' }, { status: 500 })
  }
}

// PUT update phone
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = await connectToDatabase()
    const body = await request.json()
    const { name, description, price, images } = body

    const updateData: Record<string, unknown> = { updatedAt: new Date() }
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = price
    if (images !== undefined) {
      const imagesArray = typeof images === 'string' ? JSON.parse(images) : images
      if (!Array.isArray(imagesArray) || imagesArray.length === 0) {
        return NextResponse.json({ error: 'At least one image is required' }, { status: 400 })
      }
      updateData.images = imagesArray
    }

    const result = await db.collection('phones').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json({ error: 'Phone not found' }, { status: 404 })
    }

    const { _id, ...rest } = result
    return NextResponse.json({ id: _id.toString(), ...rest })
  } catch (error) {
    console.error('Error updating phone:', error)
    return NextResponse.json({ error: 'Failed to update phone' }, { status: 500 })
  }
}

// DELETE phone
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = await connectToDatabase()

    const result = await db.collection('phones').findOneAndDelete({ _id: new ObjectId(id) })

    if (!result) {
      return NextResponse.json({ error: 'Phone not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Phone deleted successfully' })
  } catch (error) {
    console.error('Error deleting phone:', error)
    return NextResponse.json({ error: 'Failed to delete phone' }, { status: 500 })
  }
}
