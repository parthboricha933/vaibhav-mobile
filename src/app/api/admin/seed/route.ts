import { connectToDatabase, ensureSeedData } from '@/lib/db'
import { NextResponse } from 'next/server'

// POST seed admin account
export async function POST() {
  try {
    const db = await connectToDatabase()
    await ensureSeedData(db)
    return NextResponse.json({ message: 'Database seeded successfully', username: 'admin', password: 'admin123' })
  } catch (error) {
    console.error('Error seeding:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
