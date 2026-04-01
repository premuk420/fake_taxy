'use client'

import { useState, useRef } from 'react'
import { UploadCloud, File as FileIcon, X, CheckCircle, AlertCircle } from 'lucide-react'

// Simple interface for frontend
interface UploadItem {
  id: string
  name: string
  status: 'processing' | 'done' | 'error'
  resultStr?: string
}

export default function UploadPage() {
  const [queue, setQueue] = useState<UploadItem[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach(async (file) => {
      const itemId = Math.random().toString(36).substring(7)
      
      // Add to queue visualization
      setQueue(prev => [{ id: itemId, name: file.name, status: 'processing' }, ...prev])

      // Push payload to OCR engine
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/ocr', { method: 'POST', body: formData })
        const json = await res.json()
        
        if (res.ok && json.success) {
          setQueue(prev => prev.map(item => item.id === itemId ? {
            ...item,
            status: 'done',
            // Display extracted amount or simple success if amounts failed to match heuristic
            resultStr: json.data?.totalAmount ? `${json.data.totalAmount} ${json.data.currency}` : 'Extracted ✓'
          } : item))
        } else {
          setQueue(prev => prev.map(item => item.id === itemId ? {
            ...item,
            status: 'error',
            resultStr: json.error || 'Extraction Failed'
          } : item))
        }
      } catch(err) {
         setQueue(prev => prev.map(item => item.id === itemId ? { ...item, status: 'error', resultStr: 'Network Error' } : item))
      }
    })
    
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const clearItem = (id: string) => {
    setQueue(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Upload Documents</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Upload your received and issued invoices. Our system will extract key information and send it to your accountant.</p>
      </div>

      <div onClick={handleUploadClick} className="w-full max-w-3xl aspect-[21/9] border-2 border-dashed border-blue-300 dark:border-blue-500/30 rounded-3xl bg-blue-50/50 dark:bg-blue-500/5 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors relative group overflow-hidden">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          multiple
          accept="application/pdf,image/jpeg,image/png"
          className="hidden" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 group-hover:to-blue-500/10 transition-all"></div>
        <div className="w-20 h-20 bg-white dark:bg-slate-900 shadow-xl shadow-blue-200 dark:shadow-blue-900/50 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
          <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Drag & Drop files here</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Support for PDF, JPG, PNG up to 10MB.</p>
        <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform hover:bg-blue-700">
          Browse Files
        </button>
      </div>

      <div className="max-w-3xl">
        <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-50 flex items-center gap-2">
            Processing Queue <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 rounded-full px-2 text-xs">{queue.length}</span>
        </h3>
        
        {queue.length === 0 && (
          <p className="text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400 rounded-xl">Nothing uploaded yet.</p>
        )}

        <div className="space-y-4">
          {queue.map(item => (
            <div key={item.id} className={`bg-white dark:bg-slate-900 border rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden transition-all ${
                item.status === 'done' ? 'border-emerald-200 dark:border-emerald-500/20' : 
                item.status === 'error' ? 'border-red-200 dark:border-red-500/20' : 
                'border-slate-200/50 dark:border-slate-800/50'
            }`}>
              
              {item.status === 'done' && <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-emerald-500"></div>}
              {item.status === 'error' && <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-red-500"></div>}

              <div className="flex items-center gap-4 pl-2 w-full">
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                    item.status === 'done' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    item.status === 'error' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {item.status === 'done' ? <CheckCircle className="w-6 h-6"/> : item.status === 'error' ? <AlertCircle className="w-6 h-6"/> : <FileIcon className="w-6 h-6"/>}
                </div>
                
                <div className="flex flex-col flex-1 truncate">
                   <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.name}</span>
                   
                   {item.status === 'processing' && (
                     <div className="flex items-center mt-1 w-full max-w-xs">
                       <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mr-3 relative">
                         <div className="bg-blue-500 w-[60%] h-full rounded-full animate-[pulse_1.5s_infinite] absolute left-0 ease-in-out duration-700"></div>
                       </div>
                       <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 animate-pulse whitespace-nowrap">Extracting OS-OCR...</span>
                     </div>
                   )}

                   {item.status === 'done' && (
                     <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 mt-1 tracking-wide">{item.resultStr || 'Processed successfully'}</span>
                   )}

                   {item.status === 'error' && (
                     <span className="text-xs font-semibold text-red-600 dark:text-red-500 mt-1 tracking-wide">{item.resultStr}</span>
                   )}
                </div>
              </div>
              <button onClick={() => clearItem(item.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 shrink-0">
                <X className="w-5 h-5"/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
