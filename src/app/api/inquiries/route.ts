import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET all inquiries (admin only)
export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

// POST new inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, phoneNumber, message, phoneCode, phoneName } = body

    if (!customerName || !phoneNumber || !phoneCode) {
      return NextResponse.json(
        { error: 'Name, phone number, and phone code are required' },
        { status: 400 }
      )
    }

    const inquiry = await db.inquiry.create({
      data: {
        customerName,
        phoneNumber,
        message: message || null,
        phoneCode,
        phoneName: phoneName || null,
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 })
  }
}
