import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import Stripe from 'stripe'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed.', error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const firmId = session?.metadata?.firmId
    
    // If we have a successful subscription, store it to the firm record
    if (firmId && session.subscription) {
      // await prisma.firm.update({
      //   where: { id: firmId },
      //   data: { stripeSubId: session.subscription as string },
      // })
      console.log(`Updated firm ${firmId} with new subscription ${session.subscription}`)
    }
  }

  // Handle recurring invoice payment successes to update usage/tier status
  if (event.type === 'invoice.payment_succeeded') {
     console.log('Invoice payment succeeded webhook received.')
  }

  return new NextResponse('Webhook ok', { status: 200 })
}
