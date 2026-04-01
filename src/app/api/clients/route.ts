import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
  if (!dbUser?.firmId) return NextResponse.json([])

  const clients = await prisma.clientCompany.findMany({
    where: { firmId: dbUser.firmId },
    include: { _count: { select: { invoices: true, tasks: true } } },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(clients)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
  if (!dbUser?.firmId) return NextResponse.json({ error: 'No firm' }, { status: 400 })

  const { name, ico, dic } = await req.json()
  const client = await prisma.clientCompany.create({
    data: { name, ico, dic, firmId: dbUser.firmId },
  })

  return NextResponse.json(client, { status: 201 })
}
