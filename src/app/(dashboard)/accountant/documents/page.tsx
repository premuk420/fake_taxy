import Link from 'next/link'
import { FileText, Clock, ExternalLink } from 'lucide-react'

const documents = [
  { id: '123', name: 'O2_faktura_092026.pdf', client: 'Tech Solutions s.r.o.', status: 'needs_review', date: '2 hrs ago' },
  { id: '124', name: 'Alza_nakup.pdf', client: 'Tech Solutions s.r.o.', status: 'approved', date: '1 day ago' },
]

export default function DocumentsQueuePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Approval Queue</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Review AI extracted data before ISDOC export.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
           {documents.map((doc) => (
             <li key={doc.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-xl ${doc.status === 'needs_review' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      <FileText className="w-6 h-6" />
                   </div>
                   <div>
                     <p className="font-semibold text-slate-900 dark:text-slate-100">{doc.name}</p>
                     <p className="text-sm font-medium text-slate-500 flex items-center mt-1">
                       <Clock className="w-3.5 h-3.5 mr-1"/> {doc.date} <span className="mx-2">•</span> {doc.client}
                     </p>
                   </div>
                </div>
                <Link href={`/accountant/documents/${doc.id}`} className="px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center">
                  Review <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
             </li>
           ))}
        </ul>
      </div>
    </div>
  )
}
