'use client'

import { Check, CreditCard, ShieldCheck } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Billing & Plans</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your firm's subscription and OCR processing limits.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mt-8">
         <div className="p-8 md:p-10 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <div className="flex items-center gap-3 mb-2">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Free Tier</h2>
                 <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] uppercase tracking-wider font-bold rounded-full">Current Plan</span>
               </div>
               <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">You are currently using the free tier limited to 50 OCR extractions per month.</p>
            </div>
            <button onClick={() => alert('Opening Stripe billing portal...')} className="flex items-center px-6 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap">
               <CreditCard className="w-5 h-5 mr-2 text-slate-400" /> Payment Methods
            </button>
         </div>

         <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10 bg-slate-50/30 dark:bg-slate-950/30">
            <div className="flex-1 bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-3xl shadow-2xl shadow-indigo-500/10 border border-indigo-500/30 overflow-hidden text-white relative isolate p-8 md:p-10 transition-transform hover:scale-[1.02] duration-500">
               <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500 blur-[80px] opacity-30 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-blue-500 blur-[80px] opacity-20 pointer-events-none"></div>
               
               <h3 className="text-2xl font-bold flex items-center text-indigo-50 drop-shadow-sm"><ShieldCheck className="w-7 h-7 mr-3 text-indigo-400" /> Premium Firm</h3>
               <div className="mt-6 flex items-baseline text-6xl font-extrabold tracking-tight drop-shadow-sm">
                  $99<span className="text-xl font-medium text-indigo-300/80 ml-2">/mo</span>
               </div>
               <p className="mt-5 text-indigo-200/90 text-sm leading-relaxed">Upgrade to unlock unlimited OCR mapping, bulk ISDOC exports, and premium white-labeling for your clients.</p>
               
               <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 to-transparent my-8"></div>

               <ul className="space-y-4">
                  {[
                    'Unlimited Client Seats',
                    'Unlimited Mindee OCR Processing',
                    'Automated POHODA ISDOC Exports',
                    'Custom firm domain (white-labeling)',
                    'Priority support'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-indigo-100">
                       <Check className="w-5 h-5 text-emerald-400 mr-3 shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                       {feature}
                    </li>
                  ))}
               </ul>

               <button onClick={() => alert('Initiating Stripe Checkout...')} className="w-full mt-10 py-4 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/25 transition-all outline-none focus:ring-4 focus:ring-indigo-500/30 text-lg">
                  Upgrade to Premium
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}
