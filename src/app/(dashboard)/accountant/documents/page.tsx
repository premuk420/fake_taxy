'use client'

import { useEffect, useState } from 'react'
import { FileText, Clock, CheckCircle, XCircle, Loader2, Filter } from 'lucide-react'
import Link from 'next/link'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'Čeká',         color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
  EXTRACTED: { label: 'Extrahováno',  color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400' },
  APPROVED:  { label: 'Schváleno',    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' },
  REJECTED:  { label: 'Zamítnuto',    color: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400' },
  EXPORTED:  { label: 'Exportováno',  color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' },
}

const TABS = ['Vše', 'PENDING', 'EXTRACTED', 'APPROVED', 'EXPORTED']

export default function DocumentsPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('Vše')

  useEffect(() => {
    fetch('/api/invoices').then(r => r.json()).then(d => { setInvoices(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  const filtered = tab === 'Vše' ? invoices : invoices.filter(i => i.status === tab)

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Dokumenty</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{invoices.length} faktur celkem</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === t ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            {t === 'Vše' ? 'Vše' : STATUS_LABELS[t]?.label}
            <span className="ml-2 text-xs opacity-70">{t === 'Vše' ? invoices.length : invoices.filter(i => i.status === t).length}</span>
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mr-3" /> Načítám dokumenty...
        </div>
      ) : !filtered.length ? (
        <div className="text-center py-20 text-slate-400">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="font-medium text-lg">Žádné dokumenty</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inv: any) => (
            <Link key={inv.id} href={`/accountant/documents/${inv.id}`} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition group block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-50">{inv.clientCompany?.name ?? 'Neznámý klient'}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-slate-500">{inv.totalAmount ? `${inv.totalAmount.toLocaleString('cs-CZ')} ${inv.currency ?? 'CZK'}` : 'Částka neznámá'}</p>
                    {inv.dueDate && (
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(inv.dueDate).toLocaleDateString('cs-CZ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_LABELS[inv.status]?.color}`}>
                  {STATUS_LABELS[inv.status]?.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
