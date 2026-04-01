'use client'

import Link from 'next/link'
import { LayoutDashboard, UploadCloud, MessageSquare, LogOut, Settings } from 'lucide-react'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] flex flex-col md:flex-row text-slate-900 dark:text-slate-50 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      <aside className="w-full md:w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col z-20 shrink-0">
        <div className="h-[72px] flex items-center px-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">
             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              C
             </div>
             Client Portal
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Menu</div>
          <Link href="/client" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800/50 font-medium transition-all group">
            <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" /> Dashboard
          </Link>
          <Link href="/client/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800/50 font-medium transition-all group">
             <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" /> Upload Invoices
          </Link>
          <Link href="/client/chat" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800/50 font-medium transition-all group">
             <div className="flex items-center gap-3">
               <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" /> Accountant Chat
             </div>
             <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
           <button onClick={() => window.location.href = '/'} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all font-medium">
             <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-[72px] flex items-center justify-between px-6 lg:px-10 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md sticky top-0 z-10 w-full shrink-0">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Welcome back, John 👋</h2>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
               <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tech Solutions s.r.o.</p>
               <p className="text-xs text-slate-500 dark:text-slate-400">Account: Active</p>
             </div>
             <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Settings className="w-5 h-5" />
             </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 lg:p-10 relative">
          {children}
        </div>
      </main>
    </div>
  )
}
