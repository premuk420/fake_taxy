import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })

  let invoices
  if (dbUser?.role === 'ACCOUNTANT' && dbUser.firmId) {
    // Accountant sees all invoices for their firm's clients
    invoices = await prisma.invoice.findMany({
      where: { clientCompany: { firmId: dbUser.firmId } },
      include: { clientCompany: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })
  } else if (dbUser?.clientCompanyId) {
    // Client sees only their own invoices
    invoices = await prisma.invoice.findMany({
      where: { clientCompanyId: dbUser.clientCompanyId },
      include: { clientCompany: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })
  } else {
    invoices = []
  }

  return NextResponse.json(invoices)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
  if (!dbUser?.clientCompanyId) return NextResponse.json({ error: 'No client company' }, { status: 400 })

  const { fileUrl, type, extractedData } = await req.json()

  const invoice = await prisma.invoice.create({
    data: {
      clientCompanyId: dbUser.clientCompanyId,
      fileUrl: fileUrl ?? '',
      type: type ?? 'RECEIVED',
      status: 'EXTRACTED',
      totalAmount: extractedData?.totalAmount ?? null,
      currency: extractedData?.currency ?? null,
      issueDate: extractedData?.issueDate ? new Date(extractedData.issueDate) : null,
      dueDate: extractedData?.dueDate ? new Date(extractedData.dueDate) : null,
      extractedData,
    },
  })

  return NextResponse.json(invoice, { status: 201 })
}
