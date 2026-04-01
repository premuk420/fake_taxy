import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'


export const runtime = 'nodejs'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { email: user.email! }, include: { firm: true } })
  if (!dbUser?.firmId) return NextResponse.json({ clients: 0, invoices: 0, pending: 0, tasks: 0, totalAmount: 0 })

  const [clients, invoices, pending, tasks] = await Promise.all([
    prisma.clientCompany.count({ where: { firmId: dbUser.firmId } }),
    prisma.invoice.count({ where: { clientCompany: { firmId: dbUser.firmId } } }),
    prisma.invoice.count({ where: { clientCompany: { firmId: dbUser.firmId }, status: 'PENDING' } }),
    prisma.task.count({ where: { clientCompany: { firmId: dbUser.firmId }, status: { not: 'DONE' } } }),
  ])

  const amounts = await prisma.invoice.aggregate({
    where: { clientCompany: { firmId: dbUser.firmId } },
    _sum: { totalAmount: true },
  })

  return NextResponse.json({ clients, invoices, pending, tasks, totalAmount: amounts._sum.totalAmount ?? 0 })
}
