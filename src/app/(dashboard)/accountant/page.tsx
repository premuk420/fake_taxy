'use client'

import { useEffect, useState } from 'react'
import { Users, FileText, CheckSquare, TrendingUp, ArrowUpRight, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface Stats { clients: number; invoices: number; pending: number; tasks: number; totalAmount: number }

export default function AccountantDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => { setStats(d); setLoading(false) })
  }, [])

  const cards = stats ? [
    { label: 'Celkem klientů', value: stats.clients, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', href: '/accountant/clients' },
    { label: 'Ke schválení', value: stats.pending, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', href: '/accountant/documents', alert: stats.pending > 0 },
    { label: 'Otevřené úkoly', value: stats.tasks, icon: CheckSquare, color: 'text-violet-400', bg: 'bg-violet-500/10', href: '/accountant/tasks' },
    { label: 'Objem faktur', value: `${(stats.totalAmount / 1000).toFixed(0)}k CZK`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', href: '/accountant/documents' },
  ] : []

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Přehled firmy</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Aktuální stav vašich klientů a dokumentů.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse h-32" />
          ))
        ) : cards.map((card, i) => (
          <Link key={i} href={card.href} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border ${card.alert ? 'border-amber-200 dark:border-amber-500/30' : 'border-slate-200 dark:border-slate-800'} hover:shadow-md transition-all duration-300 group block`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-indigo-500 font-medium">
              <ArrowUpRight className="w-3 h-3 mr-1" /> Zobrazit detail
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-semibold text-slate-900 dark:text-slate-50 text-lg">Dokumenty čekající na schválení</h2>
            <Link href="/accountant/documents" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">Zobrazit vše</Link>
          </div>
          <PendingInvoices />
        </div>

        <div className="bg-gradient-to-b from-indigo-900 to-slate-900 rounded-2xl shadow-xl border border-indigo-500/20 text-white overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
            <h2 className="font-semibold flex items-center text-lg">
              <CheckSquare className="w-5 h-5 mr-3 text-indigo-400" /> Úkoly
            </h2>
            <Link href="/accountant/tasks" className="text-xs text-indigo-300 hover:text-white">Přidat +</Link>
          </div>
          <RecentTasks />
        </div>
      </div>
    </div>
  )
}

function PendingInvoices() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/invoices').then(r => r.json()).then(d => {
      setInvoices((Array.isArray(d) ? d : []).filter((i: any) => i.status === 'PENDING' || i.status === 'EXTRACTED').slice(0, 5))
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="p-6 text-center text-slate-400 animate-pulse">Načítám...</div>
  if (!invoices.length) return (
    <div className="p-12 text-center text-slate-400">
      <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
      <p className="font-medium">Žádné dokumenty ke schválení</p>
    </div>
  )

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {invoices.map((inv: any) => (
        <Link key={inv.id} href={`/accountant/documents/${inv.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{inv.clientCompany?.name ?? 'Neznámý klient'}</p>
              <p className="text-xs text-slate-500">{inv.totalAmount ? `${inv.totalAmount.toLocaleString()} ${inv.currency ?? 'CZK'}` : 'Částka neznámá'}</p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full">
            {inv.status === 'EXTRACTED' ? 'Extrahováno' : 'Čeká'}
          </span>
        </Link>
      ))}
    </div>
  )
}

function RecentTasks() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/tasks').then(r => r.json()).then(d => setTasks(Array.isArray(d) ? d.slice(0, 5) : []))
  }, [])

  if (!tasks.length) return (
    <div className="p-8 text-center text-slate-400 text-sm">
      <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
      Žádné otevřené úkoly
    </div>
  )

  return (
    <div className="divide-y divide-white/5">
      {tasks.map((t: any) => (
        <div key={t.id} className="px-6 py-4 hover:bg-white/5 transition">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium text-indigo-200">{t.clientCompany?.name}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.status === 'TODO' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>
              {t.status === 'TODO' ? 'TODO' : 'Probíhá'}
            </span>
          </div>
          <p className="text-sm text-white font-medium">{t.title}</p>
          {t.deadline && <p className="text-xs text-slate-400 mt-1">{new Date(t.deadline).toLocaleDateString('cs-CZ')}</p>}
        </div>
      ))}
    </div>
  )
}
