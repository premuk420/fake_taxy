import Stripe from 'stripe'

// Lazy initialization — avoids top-level crash during Vercel build
// when STRIPE_SECRET_KEY is not yet configured as an env variable.
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set. Add it to your environment variables.')
  }
  return new Stripe(key, {
    apiVersion: '2026-03-25.dahlia',
    appInfo: {
      name: 'FakeTaxy SaaS',
      version: '0.1.0',
    },
  })
}
