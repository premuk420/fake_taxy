'use client'

import { useEffect, useState } from 'react'
import { Wallet, Receipt, TrendingUp, FileText, UploadCloud, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ClientDashboard() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/invoices').then(r => r.json()).then(d => { setInvoices(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  const totalIn = invoices.filter(i => i.type === 'ISSUED').reduce((s, i) => s + (i.totalAmount ?? 0), 0)
  const totalOut = invoices.filter(i => i.type === 'RECEIVED').reduce((s, i) => s + (i.totalAmount ?? 0), 0)
  const vatEstimate = Math.max(0, (totalIn - totalOut) * 0.21)

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Finanční přehled</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Vaše faktury a odhad DPH</p>
        </div>
        <Link href="/client/upload" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-indigo-500/20">
          <UploadCloud className="w-4 h-4" /> Nahrát fakturu
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl shadow-red-500/20">
              <div className="flex justify-between items-start mb-4">
                <p className="text-red-100 font-medium text-sm">Odhadované DPH</p>
                <div className="p-2 bg-white/20 rounded-xl"><Wallet className="w-5 h-5" /></div>
              </div>
              <h3 className="text-4xl font-bold tracking-tight">{vatEstimate.toLocaleString('cs-CZ', { maximumFractionDigits: 0 })}</h3>
              <p className="text-red-100 mt-1">CZK</p>
              <p className="text-red-200 text-xs mt-3">Odhad za aktuální období (21%)</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-slate-500">Celkové příjmy</p>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-500"><TrendingUp className="w-5 h-5" /></div>
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{totalIn.toLocaleString('cs-CZ', { maximumFractionDigits: 0 })}</h3>
              <p className="text-slate-400 text-sm mt-1">CZK</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-slate-500">Celkové výdaje</p>
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-500"><Receipt className="w-5 h-5" /></div>
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{totalOut.toLocaleString('cs-CZ', { maximumFractionDigits: 0 })}</h3>
              <p className="text-slate-400 text-sm mt-1">CZK</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg">Poslední dokumenty</h3>
              <Link href="/client/upload" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">Nahrát nový +</Link>
            </div>
            {!invoices.length ? (
              <div className="py-16 text-center text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="font-medium">Zatím žádné dokumenty</p>
                <Link href="/client/upload" className="mt-4 inline-flex items-center gap-2 text-indigo-500 text-sm hover:text-indigo-600 font-medium">
                  <UploadCloud className="w-4 h-4" /> Nahrajte první fakturu
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoices.slice(0, 8).map((inv: any) => (
                  <div key={inv.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{inv.clientCompany?.name ?? 'Neznámý'}</p>
                        <p className="text-xs text-slate-400">{inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('cs-CZ') : ''}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">{inv.totalAmount?.toLocaleString('cs-CZ') ?? '—'} {inv.currency ?? 'CZK'}</p>
                      <p className={`text-xs font-medium ${inv.status === 'APPROVED' ? 'text-emerald-500' : inv.status === 'EXTRACTED' ? 'text-amber-500' : 'text-slate-400'}`}>
                        {inv.status === 'APPROVED' ? 'Schváleno' : inv.status === 'EXTRACTED' ? 'Čeká na schválení' : inv.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
