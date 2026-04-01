'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, FileText, CheckSquare, Bell, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navLinks = [
  { href: '/accountant',           label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/accountant/clients',   label: 'Klienti',       icon: Users },
  { href: '/accountant/documents', label: 'Dokumenty',     icon: FileText },
  { href: '/accountant/tasks',     label: 'Úkoly',        icon: CheckSquare },
]

export default function AccountantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans text-slate-900 dark:text-slate-50">
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/accountant" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm">T</div>
            FakeTaxy
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Účetní panel</div>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/accountant' && pathname.startsWith(href))
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${active ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50'}`}>
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition font-medium">
            <LogOut className="w-5 h-5" /> Odhlásit se
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-end px-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
