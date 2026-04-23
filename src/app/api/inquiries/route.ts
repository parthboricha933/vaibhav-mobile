import { connectToDatabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET all inquiries (admin only)
export async function GET() {
  try {
    const db = await connectToDatabase()
    
    const inquiries = await db.collection('inquiries')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    const inquiriesWithId = inquiries.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }))
    
    return NextResponse.json(inquiriesWithId)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch inquiries',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}

// POST new inquiry
export async function POST(request: NextRequest) {
  try {
    const db = await connectToDatabase()
    const body = await request.json()
    const { customerName, phoneNumber, message, phoneCode, phoneName } = body

    if (!customerName || !phoneNumber || !phoneCode) {
      return NextResponse.json(
        { error: 'Name, phone number, and phone code are required' },
        { status: 400 }
      )
    }

    const inquiry = {
      customerName,
      phoneNumber,
      message: message || null,
      phoneCode,
      phoneName: phoneName || null,
      createdAt: new Date(),
    }

    const result = await db.collection('inquiries').insertOne(inquiry)

    return NextResponse.json(
      { id: result.insertedId.toString(), ...inquiry },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json({ 
      error: 'Failed to create inquiry',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}
