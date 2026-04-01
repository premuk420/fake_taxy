import { Send, FilePlus, User } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-[100px])] md:h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 overflow-hidden animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="h-[72px] border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 px-6 flex items-center gap-4 shrink-0">
         <div className="w-11 h-11 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
           <User className="w-6 h-6"/>
         </div>
         <div>
           <h3 className="font-bold text-slate-900 dark:text-slate-50">Adam the Accountant</h3>
           <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
             <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> Online
           </p>
         </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-[#02050A]">
         <div className="flex justify-center">
           <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full shadow-sm">Today, 10:42 AM</span>
         </div>
         
         <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-auto font-bold text-sm">A</div>
           <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm p-4 text-sm text-slate-800 dark:text-slate-200 max-w-lg shadow-sm">
             Hi John! I reviewed your last batch of invoices. We are missing the DPH return for Alza. Could you upload it here or via the upload portal?
           </div>
         </div>
         
         <div className="flex gap-4 flex-row-reverse">
           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-auto shadow-md font-bold text-sm">J</div>
           <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm p-4 text-sm max-w-lg shadow-md shadow-blue-600/30">
             Sure Adam, I'll drop it in right now! Wait a sec!
           </div>
         </div>
         
         <div className="flex gap-4 flex-row-reverse">
           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-auto opacity-0 pointer-events-none">J</div>
           <div className="border border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 rounded-2xl rounded-br-sm p-4 max-w-lg flex items-center gap-4 shadow-sm">
             <div className="w-10 h-10 bg-blue-200 dark:bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400"><FilePlus className="w-5 h-5"/></div>
             <div>
               <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors cursor-pointer">Alza_DPH_03.pdf</p>
               <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">2.4 MB</p>
             </div>
           </div>
         </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50 p-4 shrink-0">
        <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full flex items-center pl-4 pr-1.5 py-1.5 shadow-inner">
          <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400" />
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mx-1">
            <FilePlus className="w-5 h-5"/>
          </button>
          <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 transition-all">
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
