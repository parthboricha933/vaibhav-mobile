import { NextRequest, NextResponse } from 'next/server'

// Max image size in bytes (2MB per image after compression)
const MAX_IMAGE_SIZE = 2 * 1024 * 1024

// Compress and resize image using Sharp
async function compressImage(buffer: Buffer, mimeType: string): Promise<{ dataUrl: string; size: number }> {
  try {
    const sharp = (await import('sharp')).default
    
    // Resize to max 800px width/height and compress
    const compressed = await sharp(buffer)
      .resize(800, 800, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ quality: 75 })
      .toBuffer()
    
    const base64 = compressed.toString('base64')
    const dataUrl = `data:image/jpeg;base64,${base64}`
    
    return { dataUrl, size: compressed.length }
  } catch (error) {
    console.error('Sharp compression error, falling back to raw base64:', error)
    // Fallback to raw base64 if sharp fails
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${mimeType};base64,${base64}`
    return { dataUrl, size: buffer.length }
  }
}

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
      const mimeType = file.type || 'image/jpeg'

      // Compress the image
      const { dataUrl, size } = await compressImage(buffer, mimeType)

      if (size > MAX_IMAGE_SIZE) {
        console.warn(`Image still large after compression: ${size} bytes`)
      }

      imageUrls.push(dataUrl)
    }

    if (imageUrls.length === 0) {
      return NextResponse.json({ error: 'No valid files uploaded' }, { status: 400 })
    }

    return NextResponse.json({ imageUrls })
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json({ 
      error: 'Failed to upload files',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}
