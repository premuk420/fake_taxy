import { NextResponse } from 'next/server'
import { generateIsdocXml } from '@/lib/isdoc'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body || !body.totalAmount) {
      return NextResponse.json({ error: 'Invalid invoice payload for ISDOC export' }, { status: 400 })
    }

    const xmlPayload = generateIsdocXml(body)

    // Normally we would update the Invoice record in Prisma with the generated string
    // await prisma.invoice.update({ where: { id: payload.id }, data: { isdocXml: xmlPayload, status: 'APPROVED' } })
    
    // Return XML directly to triggers client download
    return new NextResponse(xmlPayload, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': `attachment; filename="invoice_export_${body.ico || 'export'}.isdoc"`
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
