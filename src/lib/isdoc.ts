import { create } from 'xmlbuilder2'

// Basic ISDOC 6.0.2 Structure Mapper
export function generateIsdocXml(invoiceData: any) {
  // A standard ISDOC starts with an Invoice element
  const doc = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('Invoice', { xmlns: 'http://isdoc.cz/namespace/2013', version: '6.0.2' })
      .ele('DocumentType').txt('1').up()
      .ele('ID').txt(invoiceData.invoiceNumber || 'Unknown').up()
      .ele('UUID').txt(crypto.randomUUID()).up()
      .ele('IssueDate').txt(invoiceData.issueDate || '').up()
      .ele('LocalCurrencyCode').txt(invoiceData.currency || 'CZK').up()

      // Accounting Supplier Party
      .ele('AccountingSupplierParty')
        .ele('Party')
          .ele('PartyName')
            .ele('Name').txt(invoiceData.supplierName || '').up()
          .up()
          .ele('PartyTaxScheme')
            .ele('CompanyID').txt(invoiceData.ico || '').up()
            .ele('TaxScheme').txt('VAT').up()
          .up()
        .up()
      .up()

      // Legal Monetary Total
      .ele('LegalMonetaryTotal')
        .ele('TaxExclusiveAmount').txt(String(invoiceData.totalAmount - (invoiceData.totalTax || 0))).up()
        .ele('TaxInclusiveAmount').txt(String(invoiceData.totalAmount)).up()
        .ele('PayableAmount').txt(String(invoiceData.totalAmount)).up()
      .up()
    .up();

  return doc.end({ prettyPrint: true });
}
