'use client'

import { Users, FileText, CheckSquare, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react'

// Dummy stats data targeting the Accountant CRM domain
const stats = [
  { label: 'Total Clients', value: '142', icon: Users, trend: '+12%', positive: true, primaryColor: 'text-indigo-600 dark:text-indigo-400', primaryBg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { label: 'Pending Approvals', value: '48', icon: FileText, trend: '-5%', positive: true, alert: true, primaryColor: 'text-amber-600 dark:text-amber-500', primaryBg: 'bg-amber-50 dark:bg-amber-500/10' },
  { label: 'VAT Deadlines', value: '12', icon: CheckSquare, trend: 'Due in 3 days', positive: false, alert: true, primaryColor: 'text-red-600 dark:text-red-400', primaryBg: 'bg-red-50 dark:bg-red-500/10' },
  { label: 'MRR / Revenue', value: '$24K', icon: TrendingUp, trend: '+4%', positive: true, primaryColor: 'text-emerald-600 dark:text-emerald-400', primaryBg: 'bg-emerald-50 dark:bg-emerald-500/10' },
]

export default function AccountantDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Firm Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Welcome back. Here's a summary of ongoing operations across your clients.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 group cursor-default">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.primaryBg} ${stat.primaryColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-5 flex items-center text-sm">
              <span className={`flex items-center font-semibold ${stat.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.positive && stat.trend.includes('%') ? <ArrowUpRight className="w-4 h-4 mr-1" /> : (stat.trend.includes('%') ? <ArrowDownRight className="w-4 h-4 mr-1" /> : <Clock className="w-4 h-4 mr-1" />)}
                {stat.trend}
              </span>
              <span className="text-slate-400 dark:text-slate-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart / Activity Area */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <h2 className="font-semibold text-slate-900 dark:text-slate-50 text-lg">Document Processing Volume</h2>
            <button onClick={() => alert('Report generating...')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">View Report</button>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex-1 min-h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-400 relative">
               <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent dark:from-slate-950/10 pointer-events-none rounded-xl"></div>
               <span className="font-medium text-slate-500">[ OCR Chart Placeholder — Client Invoices Analyzed vs Processed ]</span>
            </div>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-gradient-to-b from-indigo-900 to-slate-900 rounded-2xl shadow-xl border border-indigo-500/20 overflow-hidden text-white relative isolate flex flex-col">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500 blur-3xl opacity-20 pointer-events-none"></div>
          
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center backdrop-blur-sm bg-white/5 relative z-10">
            <h2 className="font-semibold flex items-center text-lg shadow-sm">
              <CheckSquare className="w-5 h-5 mr-3 text-indigo-400"/> Action Required
            </h2>
          </div>
          
          <div className="divide-y divide-white/5 flex-1 overflow-y-auto relative z-10">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="p-5 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-indigo-200">Tech Solutions s.r.o.</span>
                  {i < 2 ? (
                    <span className="text-xs font-semibold bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full border border-red-500/30">Due Tomorrow</span>
                  ) : (
                    <span className="text-xs font-semibold bg-white/10 text-slate-300 px-2.5 py-0.5 rounded-full border border-white/10 delay-100">Pending</span>
                  )}
                </div>
                <h4 className="font-medium mb-3 text-slate-50 group-hover:text-indigo-300 transition-colors text-[15px]">DPH (VAT) March 2026</h4>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-2">
                     <span className="flex items-center text-xs font-medium bg-black/20 px-2 py-1 rounded-md text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span> 14 Invoices pending
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
