/**
 * Two-Step Open-Source OCR Pipeline
 *
 * Step 1 — Text Extraction (free, local):
 *   PDF   → pdfjs-dist/legacy  (Mozilla PDF.js, Node.js compatible)
 *   Image → tesseract.js       (Czech language pack "ces")
 *
 * Step 2 — AI Parsing (free tier):
 *   Vercel AI SDK + Google Gemini 2.0 Flash
 *   generateObject() with strict Zod schema → structured JSON
 *
 * IMPORTANT: pdfjs-dist is imported lazily inside extractTextFromPdf()
 * so that Turbopack never statically bundles it (avoids "Class constructors
 * cannot be invoked without 'new'" and worker errors).
 */

import Tesseract from 'tesseract.js'
import { generateText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { z } from 'zod'

// ---------------------------------------------------------------------------
// Zod schema — the LLM must return exactly this shape
// ---------------------------------------------------------------------------
const InvoiceSchema = z.object({
  totalAmount:  z.number().nullable().describe('Total amount to pay, as a plain number e.g. 12500.00'),
  currency:     z.string().nullable().describe('Currency code, e.g. CZK or EUR'),
  supplierName: z.string().nullable().describe('Name of the company that issued the invoice'),
  ico:          z.string().nullable().describe('Czech company registration number (IČO), 8 digits'),
  dic:          z.string().nullable().describe('Czech VAT number (DIČ), starts with CZ'),
  issueDate:    z.string().nullable().describe('Invoice issue date in YYYY-MM-DD format'),
  dueDate:      z.string().nullable().describe('Payment due date in YYYY-MM-DD format'),
})

export type ExtractedInvoice = z.infer<typeof InvoiceSchema>

// ---------------------------------------------------------------------------
// Step 1a — PDF text extraction via pdfjs-dist (lazy import)
// Importing inside the function prevents Turbopack from statically bundling
// pdfjs-dist and causing "Class constructors cannot be invoked without 'new'".
// ---------------------------------------------------------------------------
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Dynamic import — Turbopack defers this to Node.js runtime
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')

  // Crucial: set workerSrc so pdfjs-dist uses its bundled fake worker in Node.js
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/legacy/build/pdf.worker.mjs'

  const pdfData = new Uint8Array(buffer)
  const loadingTask = pdfjsLib.getDocument({
    data: pdfData,
    disableFontFace: true,
    useWorkerFetch: false,
    isEvalSupported: false,
  })
  const pdfDocument = await loadingTask.promise

  let rawText = ''
  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i)
    const textContent = await page.getTextContent()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rawText += textContent.items.map((item: any) => item.str as string).join(' ') + '\n'
  }
  return rawText
}

// ---------------------------------------------------------------------------
// Step 1b — Image OCR via tesseract.js
// ---------------------------------------------------------------------------
async function extractTextFromImage(buffer: Buffer): Promise<string> {
  const { data: { text } } = await Tesseract.recognize(
    buffer,
    'ces',
    { logger: m => console.log('[Tesseract]', m.status) }
  )
  return text
}

// ---------------------------------------------------------------------------
// Step 2 — AI parsing with Llama 3.3 70B via Groq (free tier)
// ---------------------------------------------------------------------------
async function parseWithAI(rawText: string): Promise<ExtractedInvoice> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error(
      'GROQ_API_KEY is not set. ' +
      'Get a free key at https://console.groq.com and add it to .env.local'
    )
  }

  const groq = createGroq({ apiKey })

  // generateText + manual JSON parse:
  // Groq's Llama models don't support the strict json_schema structured output
  // that generateObject() uses. Instead we ask the model to return raw JSON
  // and parse it ourselves against the Zod schema for validation.
  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt: `You are an expert Czech accountant and invoice parser.
Extract the following fields from the invoice text below and return ONLY a valid JSON object — no explanation, no markdown, no text outside the JSON.

Required JSON keys (use null if not found):
- totalAmount: number (plain float, e.g. 12500.00)
- currency: string (e.g. "CZK" or "EUR")
- supplierName: string (company that issued the invoice)
- ico: string (Czech IČO, exactly 8 digits)
- dic: string (Czech DIČ, starts with "CZ")
- issueDate: string (YYYY-MM-DD format)
- dueDate: string (YYYY-MM-DD format)

--- RAW INVOICE TEXT ---
${rawText.slice(0, 6000)}
--- END ---`,
  })

  // Strip any accidental markdown code fences the model might add
  const jsonStr = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

  const parsed = JSON.parse(jsonStr)

  // Validate & coerce through Zod schema
  return InvoiceSchema.parse({
    totalAmount:  parsed.totalAmount  ?? null,
    currency:     parsed.currency     ?? null,
    supplierName: parsed.supplierName ?? null,
    ico:          parsed.ico          ?? null,
    dic:          parsed.dic          ?? null,
    issueDate:    parsed.issueDate    ?? null,
    dueDate:      parsed.dueDate      ?? null,
  })


}

// ---------------------------------------------------------------------------
// Public entry point — called by /api/ocr
// ---------------------------------------------------------------------------
export async function processDocumentLocally(
  fileBuffer: Buffer,
  mimeType: string,
) {
  try {
    let rawText: string

    if (mimeType === 'application/pdf') {
      rawText = await extractTextFromPdf(fileBuffer)
    } else if (mimeType.startsWith('image/')) {
      rawText = await extractTextFromImage(fileBuffer)
    } else {
      return {
        success: false as const,
        error: 'Unsupported file type. Please upload PDF, JPG or PNG.',
      }
    }

    if (!rawText.trim()) {
      return {
        success: false as const,
        error: 'No readable text found in this document. If this is a scan, try uploading as a JPG/PNG image.',
      }
    }

    console.log(`[OCR] Text extracted (${rawText.length} chars) — sending to Groq Llama 3.3…`)

    const data = await parseWithAI(rawText)

    return { success: true as const, data, rawText }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[OCR] Pipeline error:', message)
    return { success: false as const, error: message }
  }
}
