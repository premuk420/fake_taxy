'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, UploadCloud, MessageSquare, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navLinks = [
  { href: '/client',        label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/client/upload', label: 'Nahrát faktury', icon: UploadCloud },
  { href: '/client/chat',   label: 'Chat s účetním', icon: MessageSquare },
]

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] flex flex-col md:flex-row text-slate-900 dark:text-slate-50 font-sans">
      <aside className="w-full md:w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col z-20 shrink-0">
        <div className="h-[72px] flex items-center px-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <Link href="/client" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">C</div>
            Klientský portál
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">Menu</div>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/client' && pathname.startsWith(href))
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${active ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50'}`}>
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition font-medium">
            <LogOut className="w-5 h-5" /> Odhlásit se
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-[72px] flex items-center justify-between px-6 lg:px-10 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Vítejte 👋</h2>
        </header>
        <div className="flex-1 overflow-auto p-4 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
