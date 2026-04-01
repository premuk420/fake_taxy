'use client'

import { Search, Plus, MoreHorizontal, FileText, CheckCircle2 } from 'lucide-react'

// Dummy data
const clients = [
  { id: 1, name: 'Tech Solutions s.r.o.', ico: '12345678', dic: 'CZ12345678', status: 'Active', mrr: '$1,200', missingDocs: 0 },
  { id: 2, name: 'Alpha Retail Ltd', ico: '87654321', dic: 'CZ87654321', status: 'Active', mrr: '$850', missingDocs: 12 },
  { id: 3, name: 'Global Logistics a.s.', ico: '11223344', dic: 'CZ11223344', status: 'Onboarding', mrr: '$2,400', missingDocs: 5 }
]

export default function ClientsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Client Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all your firm's clients and their tax settings</p>
        </div>
        <button onClick={() => alert('Checking adding client...')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-lg shadow-indigo-500/20 transition-all">
          <Plus className="w-5 h-5 mr-2" /> Add Client
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search clients by name or IČO..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-slate-50 placeholder:text-slate-400"
            />
          </div>
          <div className="hidden sm:flex items-center gap-3">
             <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Filter</button>
             <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Export</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">IČO / DIČ</th>
                <th className="px-6 py-4">Monthly Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {clients.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-50 text-base">{c.name}</div>
                    {c.missingDocs > 0 ? (
                      <div className="text-xs font-medium text-amber-600 dark:text-amber-500 mt-1 flex items-center leading-tight">
                        <FileText className="w-3.5 h-3.5 mr-1" /> {c.missingDocs} missing docs
                      </div>
                    ) : (
                      <div className="text-xs font-medium text-emerald-600 dark:text-emerald-500 mt-1 flex items-center leading-tight">
                         <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> All documents clear
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs space-y-1">
                    <div>{c.ico}</div>
                    <div className="text-slate-400 dark:text-slate-500">{c.dic}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                    {c.mrr}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold border ${
                      c.status === 'Active' 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                        : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
