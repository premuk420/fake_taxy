// Prisma lazy singleton via Proxy
// PrismaClient is only instantiated on the first DB call, never at import time.
// This prevents Vercel build crashes during "Collecting page data".
let _client: any

export const prisma: typeof import('@prisma/client').PrismaClient.prototype =
  new Proxy({} as any, {
    get(_, prop) {
      if (!_client) {
        // Dynamic require prevents Turbopack from evaluating this at build time
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { PrismaClient } = require('@prisma/client')
        _client = new PrismaClient()
      }
      const value = _client[prop as string]
      return typeof value === 'function' ? value.bind(_client) : value
    },
  })
