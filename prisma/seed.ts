import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ datasources: { db: { url: 'file:./dev.db' } } })

async function main() {
  console.log('Seeding initial data...')

  // 1. Create a Firm
  const firm = await prisma.firm.create({
    data: {
      name: 'Acme Accounting Partners',
    },
  })

  // 2. Create an Accountant User
  const accountant = await prisma.user.create({
    data: {
      email: 'admin@acmepartners.com',
      role: 'ACCOUNTANT',
      firmId: firm.id,
    },
  })

  // 3. Create a Client Company
  const clientCompany = await prisma.clientCompany.create({
    data: {
      name: 'Tech Solutions s.r.o.',
      ico: '12345678',
      dic: 'CZ12345678',
      firmId: firm.id,
    },
  })

  // 4. Create a Client User
  const clientUser = await prisma.user.create({
    data: {
      email: 'ceo@techsolutions.cz',
      role: 'CLIENT',
      firmId: firm.id,
      clientCompanyId: clientCompany.id,
    },
  })

  // 5. Create some sample tasks
  await prisma.task.create({
    data: {
      title: 'Submit DPH return for March',
      description: 'Need to review all received invoices.',
      deadline: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
      status: 'TODO',
      assigneeId: accountant.id,
      clientCompanyId: clientCompany.id,
    },
  })

  // 6. Create sample invoices
  await prisma.invoice.create({
    data: {
      clientCompanyId: clientCompany.id,
      fileUrl: 'https://example.supabase.co/storage/v1/object/public/invoices/sample.pdf',
      type: 'RECEIVED',
      status: 'PENDING',
      issueDate: new Date(),
      totalAmount: 1500.00,
      currency: 'CZK'
    }
  })

  console.log('Seeding finished successfully. Default accounts:')
  console.log('Accountant: admin@acmepartners.com')
  console.log('Client: ceo@techsolutions.cz')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
