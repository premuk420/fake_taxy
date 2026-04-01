import { CheckSquare, Clock, AlertCircle, Plus } from 'lucide-react'

// Dummy Data
const columns = [
  { id: 'todo', title: 'To Do', accent: 'bg-slate-400 shadow-slate-500/20' },
  { id: 'in_progress', title: 'Processing', accent: 'bg-indigo-500 shadow-indigo-500/20' },
  { id: 'done', title: 'Completed', accent: 'bg-emerald-500 shadow-emerald-500/20' }
]

const tasks = [
  { id: 1, title: 'DPH March 2026', client: 'Tech Solutions s.r.o.', status: 'todo', due: '2 Days', urgent: true },
  { id: 2, title: 'Annual Tax Return 2025', client: 'Alpha Retail Ltd', status: 'in_progress', due: '3 Weeks', urgent: false },
  { id: 3, title: 'Employee Payroll', client: 'Global Logistics', status: 'done', due: 'Done', urgent: false },
]

export default function TasksPage() {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">VAT Deadlines & Tasks</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage compliance deadlines across all clients with this Kanban view.</p>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.id} className="min-w-[320px] w-80 flex flex-col bg-slate-50 border-t border-x dark:bg-slate-900/50 rounded-t-xl rounded-b-lg border-b-2 border-slate-200 dark:border-slate-800 p-4 shrink-0 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent opacity-50" />
            <div className="flex items-center justify-between mb-4 px-1 pt-1">
              <h2 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.accent} shadow-md ring-2 ring-white/50 dark:ring-black/50`} />
                {col.title}
              </h2>
              <span className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            
            <div className="flex flex-col gap-3">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing border-l-4 border-l-transparent hover:border-l-indigo-500 relative group">
                  <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold tracking-wide text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">{task.client}</span>
                    {task.urgent && <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-[15px] leading-snug">{task.title}</h3>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      <span className={task.urgent ? 'text-red-600 dark:text-red-400 font-bold' : ''}>{task.due}</span>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 font-bold shadow-inner">
                       {task.client.substring(0, 1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
