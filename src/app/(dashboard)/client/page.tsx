'use client'

import { Wallet, Receipt, CreditCard, TrendingUp, DownloadCloud } from 'lucide-react'

export default function ClientDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Financial Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time VAT estimates and expense tracking.</p>
        </div>
        <button onClick={() => alert('Exporting generic CSV...')} className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium py-2 px-4 rounded-lg flex items-center transition-all">
          <DownloadCloud className="w-4 h-4 mr-2" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated VAT to Pay</p>
               <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mt-2 tracking-tight">42,500 <span className="text-2xl text-slate-400">CZK</span></h3>
             </div>
             <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl">
               <Wallet className="w-6 h-6" />
             </div>
           </div>
           <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-4 flex items-center">
             <TrendingUp className="w-4 h-4 mr-1" /> +12.5% from last period
           </p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Income</p>
               <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mt-2 tracking-tight">320k <span className="text-2xl text-slate-400">CZK</span></h3>
             </div>
             <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
               <CreditCard className="w-6 h-6" />
             </div>
           </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses</p>
               <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mt-2 tracking-tight">145k <span className="text-2xl text-slate-400">CZK</span></h3>
             </div>
             <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
               <Receipt className="w-6 h-6" />
             </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-800 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <h3 className="text-xl font-bold mb-6 relative z-10">Income vs Expenses (YTD)</h3>
          <div className="h-[250px] w-full flex items-center justify-center border border-slate-700/50 rounded-2xl bg-slate-950/20 backdrop-blur-sm">
             <span className="text-slate-400 font-medium">✨ Chart.js Overview Placeholder ✨</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-50">Recent Documents</h3>
          <div className="flex-1 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Receipt className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Alza.cz invoice_0{i}.pdf</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Processed OCR</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">12,500 CZK</span>
              </div>
            ))}
          </div>
          <button onClick={() => alert('Opening document manager...')} className="w-full mt-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition">View All Documents</button>
        </div>
      </div>
    </div>
  )
}
