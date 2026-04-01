import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function POST(req: Request) {
  const { email, role, firmName } = await req.json()

  try {
    // Create or find the firm
    let firm = await prisma.firm.findFirst({ where: { name: firmName } })
    if (!firm) {
      firm = await prisma.firm.create({ data: { name: firmName } })
    }

    // Create user record linked to firm
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        role,
        firmId: role === 'ACCOUNTANT' ? firm.id : undefined,
        clientCompanyId: role === 'CLIENT' ? undefined : undefined,
      },
    })

    // If client, create their ClientCompany
    if (role === 'CLIENT') {
      const clientCo = await prisma.clientCompany.upsert({
        where: { id: user.clientCompanyId ?? 'nonexistent' },
        update: {},
        create: {
          name: firmName,
          firmId: firm.id,
        },
      })
      await prisma.user.update({
        where: { id: user.id },
        data: { clientCompanyId: clientCo.id },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('[register]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
