'use client'

import { useEffect, useState } from 'react'
import { CheckSquare, Plus, Circle, Loader2, Calendar, X } from 'lucide-react'

const STATUSES = [
  { key: 'TODO',        label: 'To Do',      color: 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700' },
  { key: 'IN_PROGRESS', label: 'Probíhá',    color: 'bg-blue-50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20' },
  { key: 'DONE',        label: 'Hotovo',     color: 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20' },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', deadline: '' })
  const [saving, setSaving] = useState(false)

  const load = () => {
    fetch('/api/tasks').then(r => r.json()).then(d => { setTasks(Array.isArray(d) ? d : []); setLoading(false) })
  }

  useEffect(load, [])

  const updateStatus = async (id: string, status: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    await fetch('/api/tasks', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
  }

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ title: '', description: '', deadline: '' })
    setShowForm(false)
    load()
    setSaving(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Úkoly</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{tasks.filter(t => t.status !== 'DONE').length} otevřených úkolů</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" /> Nový úkol
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Nový úkol</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={addTask} className="space-y-4">
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Název úkolu *" className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Popis (volitelné)" rows={3} className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              <input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-xl hover:bg-slate-50">Zrušit</button>
                <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl disabled:opacity-60">
                  {saving ? 'Ukládám...' : 'Vytvořit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400"><Loader2 className="w-8 h-8 animate-spin mr-2" /> Načítám...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {STATUSES.map(col => (
            <div key={col.key} className={`rounded-2xl border p-4 ${col.color} space-y-3 min-h-[200px]`}>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 px-1 mb-4">
                <CheckSquare className="w-4 h-4" /> {col.label}
                <span className="ml-auto text-xs font-medium bg-white/50 dark:bg-white/10 px-2 py-0.5 rounded-full">
                  {tasks.filter(t => t.status === col.key).length}
                </span>
              </h3>
              {tasks.filter(t => t.status === col.key).map((task: any) => (
                <div key={task.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 group">
                  <p className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-1">{task.title}</p>
                  {task.description && <p className="text-xs text-slate-500 mb-2">{task.description}</p>}
                  {task.deadline && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                      <Calendar className="w-3 h-3" /> {new Date(task.deadline).toLocaleDateString('cs-CZ')}
                    </p>
                  )}
                  <div className="flex gap-1">
                    {STATUSES.filter(s => s.key !== col.key).map(s => (
                      <button key={s.key} onClick={() => updateStatus(task.id, s.key)} className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                        → {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {!tasks.filter(t => t.status === col.key).length && (
                <div className="text-center py-8 text-slate-400 text-sm"><Circle className="w-6 h-6 mx-auto mb-2 opacity-30" /> Prázdné</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
