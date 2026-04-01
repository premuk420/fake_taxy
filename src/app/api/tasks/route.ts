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

  const tasks = await prisma.task.findMany({
    where: { clientCompany: { firmId: dbUser.firmId } },
    include: { clientCompany: { select: { name: true } }, assignee: { select: { email: true } } },
    orderBy: { deadline: 'asc' },
  })

  return NextResponse.json(tasks)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, description, deadline, clientCompanyId } = await req.json()
  const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })

  const task = await prisma.task.create({
    data: {
      title,
      description,
      deadline: deadline ? new Date(deadline) : null,
      status: 'TODO',
      assigneeId: dbUser?.id,
      clientCompanyId,
    },
  })

  return NextResponse.json(task, { status: 201 })
}

export async function PATCH(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, status } = await req.json()
  const task = await prisma.task.update({ where: { id }, data: { status } })

  return NextResponse.json(task)
}
