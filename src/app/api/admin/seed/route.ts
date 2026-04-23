import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// POST seed admin account
export async function POST() {
  try {
    const existing = await db.admin.findUnique({ where: { username: 'admin' } })

    if (existing) {
      return NextResponse.json({ message: 'Admin already exists' })
    }

    await db.admin.create({
      data: {
        username: 'admin',
        password: 'admin123',
      },
    })

    return NextResponse.json({ message: 'Admin seeded successfully', username: 'admin', password: 'admin123' })
  } catch (error) {
    console.error('Error seeding admin:', error)
    return NextResponse.json({ error: 'Failed to seed admin' }, { status: 500 })
  }
}
