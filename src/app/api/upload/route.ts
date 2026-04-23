import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const imageUrls: string[] = []

    for (const file of files) {
      if (!file) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const ext = path.extname(file.name) || '.jpg'
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`

      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, buffer)

      imageUrls.push(`/uploads/${filename}`)
    }

    if (imageUrls.length === 0) {
      return NextResponse.json({ error: 'No valid files uploaded' }, { status: 400 })
    }

    return NextResponse.json({ imageUrls })
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 })
  }
}
