import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const imageUrls: string[] = []

    for (const file of files) {
      if (!file) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Convert to base64 data URL (works on Vercel - no filesystem needed)
      const mimeType = file.type || 'image/jpeg'
      const base64 = buffer.toString('base64')
      const dataUrl = `data:${mimeType};base64,${base64}`

      imageUrls.push(dataUrl)
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
