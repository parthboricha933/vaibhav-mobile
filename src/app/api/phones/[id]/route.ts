import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET single phone
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const phone = await db.phone.findUnique({ where: { id } })
    if (!phone) {
      return NextResponse.json({ error: 'Phone not found' }, { status: 404 })
    }
    return NextResponse.json(phone)
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
    const body = await request.json()
    const { name, description, price, imageURL } = body

    const existing = await db.phone.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Phone not found' }, { status: 404 })
    }

    const phone = await db.phone.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(imageURL !== undefined && { imageURL }),
      },
    })

    return NextResponse.json(phone)
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
    const existing = await db.phone.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Phone not found' }, { status: 404 })
    }

    await db.phone.delete({ where: { id } })
    return NextResponse.json({ message: 'Phone deleted successfully' })
  } catch (error) {
    console.error('Error deleting phone:', error)
    return NextResponse.json({ error: 'Failed to delete phone' }, { status: 500 })
  }
}
