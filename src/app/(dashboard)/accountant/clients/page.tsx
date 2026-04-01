'use client'

import { useEffect, useState } from 'react'
import { Users, Plus, Building2, FileText, CheckSquare, Search, X } from 'lucide-react'

interface Client { id: string; name: string; ico?: string | null; dic?: string | null; _count: { invoices: number; tasks: number } }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', ico: '', dic: '' })
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    fetch('/api/clients').then(r => r.json()).then(d => { setClients(Array.isArray(d) ? d : []); setLoading(false) })
  }

  useEffect(load, [])

  const addClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setShowForm(false)
    setForm({ name: '', ico: '', dic: '' })
    load()
    setSaving(false)
  }

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.ico?.includes(search))

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Klienti</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{clients.length} klientů celkem</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" /> Přidat klienta
        </button>
      </div>

      {/* Add client modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Nový klient</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={addClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Název firmy *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Tech Solutions s.r.o." className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">IČO</label>
                <input value={form.ico} onChange={e => setForm(f => ({ ...f, ico: e.target.value }))} placeholder="12345678" className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">DIČ</label>
                <input value={form.dic} onChange={e => setForm(f => ({ ...f, dic: e.target.value }))} placeholder="CZ12345678" className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition">Zrušit</button>
                <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-60">
                  {saving ? 'Ukládám...' : 'Přidat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Hledat klienta nebo IČO..." className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse" />)}</div>
      ) : !filtered.length ? (
        <div className="text-center py-20 text-slate-400">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="font-medium text-lg">{search ? 'Žádný výsledek' : 'Zatím žádní klienti'}</p>
          {!search && <p className="mt-2 text-sm">Přidejte prvního klienta tlačítkem výše</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between hover:shadow-md transition group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
                  {c.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-50">{c.name}</p>
                  <p className="text-sm text-slate-500">{c.ico ? `IČO: ${c.ico}` : ''}{c.dic ? ` · DIČ: ${c.dic}` : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {c._count.invoices}</div>
                <div className="flex items-center gap-1.5"><CheckSquare className="w-4 h-4" /> {c._count.tasks}</div>
                <Building2 className="w-4 h-4 opacity-0 group-hover:opacity-100 text-indigo-500 transition" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
