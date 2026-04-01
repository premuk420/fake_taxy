import { NextResponse } from 'next/server'
import { processDocumentLocally } from '@/lib/os-ocr'

// Tell Next.js this route needs the full Node.js runtime (not Edge)
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    const maxBytes = 10 * 1024 * 1024 // 10 MB
    if (file.size > maxBytes) {
      return NextResponse.json({ error: 'File is too large (max 10 MB).' }, { status: 413 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await processDocumentLocally(buffer, file.type)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 422 })
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/ocr]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
