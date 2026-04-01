import Tesseract from 'tesseract.js';


// Polyfill server-side DOM objects required by Mozilla PDF.js (underlying pdf-parse)
if (typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class DOMMatrix {} as any;
}

// Unified Custom Extraction Pipeline
export async function processDocumentLocally(fileBuffer: Buffer, mimeType: string) {
  let rawText = '';
  
  try {
    // Stage 1: File Ingestion & Rendering
    if (mimeType === 'application/pdf') {
       // Fast extraction against vector-PDFs
       // Dynamically importing to resolve Next.js strict ESM Turbopack export errors on older CJS packages
       const pdfParseCore = require('pdf-parse');
       const pdfParser = pdfParseCore.PDFParse || pdfParseCore;
       const data = await pdfParser(fileBuffer);
       rawText = data.text;
    } 
    else if (mimeType.startsWith('image/')) {
       // Slow extraction against raster images (Mobile Photos, Scans)
       const { data: { text } } = await Tesseract.recognize(
         fileBuffer,
         'ces', // Czech Language Pack
         { logger: m => console.log('Tesseract:', m) }
       );
       rawText = text;
    } 
    else {
       return { success: false, error: 'Unsupported file format for OCR.' }
    }

    // Stage 2: Heuristics Regex Mapping Engine
    const extractedData = {
      ico: extractIco(rawText),
      dic: extractDic(rawText),
      totalAmount: extractTotal(rawText),
      issueDate: extractDate(rawText, ['vystavení', 'vyhotovení', 'datum', 'zdanitelného']),
      dueDate: extractDate(rawText, ['splatnost', 'splatnosti', 'platba do']),
      currency: extractCurrency(rawText) || 'CZK',
      supplierName: extractSupplier(rawText)
    };

    return {
      success: true,
      data: extractedData,
      rawResponse: { rawText } // Passing original raw payload backward
    };

  } catch (error) {
    console.error('OS OCR Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown OCR Error' }
  }
}

// ----------------------------------------------------- //
// STAGE 3: ISDOC Heuristic Extractors (Regex Sandbox) 
// ----------------------------------------------------- //

function extractIco(text: string): string | null {
  const match = text.match(/(?:IČO|IČ|IC)[\s:]*([\d]{8})/i);
  return match ? match[1] : null;
}

function extractDic(text: string): string | null {
  const match = text.match(/(?:DIČ|DIC)[\s:]*(CZ[\d]{8,10})/i);
  return match ? match[1] : null;
}

function extractTotal(text: string): string | null {
  // Matches typical Czech numerical structures next to "Celkem"
  const match = text.match(/(?:celkem|úhradě|uhrade)[\s\S]{0,40}?(\d{1,3}(?:[\s.,]\d{3})*(?:[.,]\d{2})?)/i);
  if (!match) return null;
  // Standardize the float output (remove arbitrary spacing, switch commas to decimal notations)
  const clean = match[1].replace(/\s/g, '').replace(',', '.');
  return clean;
}

function extractDate(text: string, keywords: string[]): string | null {
  for (const kw of keywords) {
    // Looks for 12.05.2026 or 12. 5. 2026 formats within 30 characters of the keyword
    const kwRegex = new RegExp(`${kw}[\\s\\S]{0,30}(\\d{1,2}\\.\\s?\\d{1,2}\\.\\s?\\d{4})`, 'i');
    const match = text.match(kwRegex);
    if (match) {
      const parts = match[1].replace(/\s/g, '').split('.');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
  }
  return null;
}

function extractCurrency(text: string): string | null {
  if (text.match(/(?:Kč|CZK|Cz)/i)) return 'CZK';
  if (text.match(/(?:€|EUR|Euro)/i)) return 'EUR';
  return null;
}

function extractSupplier(text: string): string | null {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
  return lines.length > 0 ? lines[0] : null;
}
