'use client'

import Link from 'next/link'
import { LayoutDashboard, Users, FileText, CheckSquare, Bell, LogOut } from 'lucide-react'

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans text-slate-900 dark:text-slate-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm shrink-0 z-20 transition-all">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm ring-1 ring-indigo-500/50">
              T
            </div>
            FakeTaxy
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-2">Accountant CRM</div>
          
          <Link href="/accountant" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium transition-all group">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          
          <Link href="/accountant/clients" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50 font-medium transition-all">
            <Users className="w-5 h-5" />
            Clients
          </Link>
          
          <Link href="/accountant/tasks" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50 font-medium transition-all">
            <CheckSquare className="w-5 h-5" />
            VAT Tasks
          </Link>

          <Link href="/accountant/documents" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50 font-medium transition-all">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              Approval Queue
            </div>
            <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-sm">
              12
            </span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={() => window.location.href = '/'} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all font-medium">
            <span className="flex items-center gap-3"><LogOut className="w-5 h-5" /> Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-end px-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-10 w-full shrink-0">
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">Admin Demo</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Acme Partners</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
            </div>
          </div>
        </header>
        
        {/* Scrollable Children */}
        <div className="flex-1 overflow-auto p-4 md:p-8 relative">
          {children}
        </div>
      </div>
    </div>
  )
}
