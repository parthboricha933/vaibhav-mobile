import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// POST admin login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const admin = await db.admin.findUnique({ where: { username } })

    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Set a simple session cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', btoa(`${username}:${Date.now()}`), {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return NextResponse.json({ success: true, username: admin.username })
  } catch (error) {
    console.error('Error during admin login:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

// GET check admin session
export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('Error checking session:', error)
    return NextResponse.json({ authenticated: false })
  }
}

// DELETE admin logout
export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
