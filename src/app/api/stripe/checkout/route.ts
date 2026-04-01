import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const { priceId, firmId, successUrl, cancelUrl } = await req.json()

    if (!firmId) {
      return NextResponse.json({ error: 'Firm ID is required' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId || 'price_1PlaceholderId',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/accountant/billing?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/accountant/billing?canceled=true`,
      client_reference_id: firmId,
      metadata: {
        firmId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
