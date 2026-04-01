import { ArrowLeft, CheckCircle, Save } from 'lucide-react'
import Link from 'next/link'

export default function DocumentApprovalPage({ params }: { params: { id: string } }) {
  // Dummy data representing extracted state
  const extractedData = {
    supplierName: 'O2 Czech Republic a.s.',
    ico: '60193336',
    dic: 'CZ60193336',
    issueDate: '2026-03-12',
    dueDate: '2026-03-26',
    totalAmount: '1450.00',
    currency: 'CZK'
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-100 dark:bg-slate-950 z-50">
      {/* Header */}
      <div className="h-[72px] shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex justify-between items-center z-10 w-full shadow-sm relative">
         <div className="flex items-center gap-4">
           <Link href="/accountant/documents" className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
           </Link>
           <div>
             <h2 className="font-bold text-slate-900 dark:text-slate-50 drop-shadow-sm text-lg tracking-tight">Invoice #INV-{params.id || '920-X'}</h2>
             <p className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                Tech Solutions s.r.o. 
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span> 
                Uploaded 2 hrs ago
             </p>
           </div>
         </div>
         <div className="flex gap-3">
           <button className="flex items-center px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-colors text-sm">
             <Save className="w-4 h-4 mr-2" /> Save Draft
           </button>
           <button className="flex items-center px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 text-sm ring-1 ring-emerald-600">
             <CheckCircle className="w-4 h-4 mr-2 text-emerald-100" /> Approve & Export ISDOC
           </button>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Document Viewer */}
        <div className="flex-1 p-6 md:p-8 flex items-center justify-center relative z-0">
          <div className="absolute inset-0 bg-slate-200/50 dark:bg-[#02050A]"></div>
          <div className="w-[90%] h-full max-w-4xl bg-white dark:bg-slate-100 shadow-2xl rounded-sm relative border border-slate-300 flex items-center justify-center p-8 z-10 transition-transform hover:scale-[1.01] duration-500">
             {/* PDF UI Wrapper */}
             <div className="absolute top-4 right-4 text-xs font-bold font-mono text-slate-400 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">Page 1 / 1</div>
             <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-lg flex flex-col justify-center items-center text-slate-400 bg-slate-50">
                <span className="font-bold text-2xl uppercase tracking-[0.2em] text-slate-300 drop-shadow-sm">PDF RENDERER</span>
                <span className="mt-4 text-sm max-w-sm text-center font-medium leading-relaxed">PDF.js or iframe integration belongs here to display the original uploaded supplier invoice.</span>
             </div>
          </div>
        </div>
        
        {/* Right Side: Extraction Form */}
        <div className="w-full md:w-[480px] lg:w-[540px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col relative shadow-[-10px_0_30px_rgba(0,0,0,0.03)] z-20">
          <div className="p-6 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0 backdrop-blur-md sticky top-0 z-10">
             <h3 className="font-bold text-slate-900 dark:text-slate-50 flex items-center text-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2.5 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse"></span>
                Extracted Data
             </h3>
             <span className="text-xs bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 py-1.5 px-3 rounded-full font-bold border border-indigo-200 dark:border-indigo-500/20 uppercase tracking-widest shadow-sm">Mindee AI</span>
          </div>

          <div className="p-6 md:p-8 space-y-8 flex-1">
             <div className="space-y-5 relative">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center">
                  <span className="w-4 h-px bg-slate-300 dark:bg-slate-700 mr-2"></span>
                  Supplier Details
                </h4>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">Supplier Name</label>
                  <input type="text" defaultValue={extractedData.supplierName} className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 font-medium transition-all shadow-sm focus:border-indigo-500 focus:ring-indigo-500/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-xs font-bold text-emerald-600 dark:text-emerald-500 mb-1.5 flex items-center">
                        IČO <span className="ml-2 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    </label>
                    <input type="text" defaultValue={extractedData.ico} className="w-full p-3 bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-400/50 rounded-xl text-sm font-mono text-emerald-700 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold shadow-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">DIČ (VAT ID)</label>
                    <input type="text" defaultValue={extractedData.dic} className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 transition-shadow shadow-sm focus:border-indigo-500 focus:ring-indigo-500/20" />
                  </div>
                </div>
             </div>

             <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent w-full" />

             <div className="space-y-5">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center">
                   <span className="w-4 h-px bg-slate-300 dark:bg-slate-700 mr-2"></span>
                   Financial Totals
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">Total Amount</label>
                    <div className="relative group">
                      <input type="text" defaultValue={extractedData.totalAmount} className="w-full p-3.5 pl-4 pr-14 bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-500/40 rounded-xl font-bold text-indigo-700 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500/30 text-xl transition-all shadow-sm" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800 px-2 py-1 rounded text-xs font-bold text-indigo-500 shadow-sm group-hover:scale-105 transition-transform">{extractedData.currency}</div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">Tax Rate</label>
                    <select className="w-full p-3.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all">
                      <option>Highest (21%)</option>
                      <option>Reduced (12%)</option>
                      <option>Zero (0%)</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 block flex items-center">Issue Date</label>
                    <input type="date" defaultValue={extractedData.issueDate} className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 font-semibold font-sans shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-red-600 dark:text-red-500 mb-1 block">Due Date</label>
                    <input type="date" defaultValue={extractedData.dueDate} className="w-full p-3 bg-red-50/30 dark:bg-red-900/10 border border-red-300 dark:border-red-800/50 rounded-xl text-sm text-red-700 dark:text-red-400 font-semibold font-sans shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
