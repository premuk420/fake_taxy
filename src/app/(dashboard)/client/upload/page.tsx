'use client'

import { useEffect, useState, useRef } from 'react'
import { Upload, FileText, CheckCircle2, XCircle, Loader2, Trash2, CloudUpload } from 'lucide-react'

interface UploadItem {
  id: string
  file: File
  status: 'pending' | 'uploading' | 'success' | 'error'
  result?: any
  error?: string
}

export default function ClientUploadPage() {
  const [queue, setQueue] = useState<UploadItem[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | File[]) => {
    const items: UploadItem[] = Array.from(files)
      .filter(f => f.type === 'application/pdf' || f.type.startsWith('image/'))
      .map(f => ({ id: Math.random().toString(36).slice(2), file: f, status: 'pending' }))
    setQueue(q => [...q, ...items])
  }

  const processFile = async (item: UploadItem) => {
    setQueue(q => q.map(i => i.id === item.id ? { ...i, status: 'uploading' } : i))

    const fd = new FormData()
    fd.append('file', item.file)

    try {
      const ocrRes = await fetch('/api/ocr', { method: 'POST', body: fd })
      const ocr = await ocrRes.json()

      if (!ocrRes.ok || !ocr.success) throw new Error(ocr.error ?? 'OCR selhalo')

      // Save invoice to DB
      await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileUrl: item.file.name, type: 'RECEIVED', extractedData: ocr.data }),
      })

      setQueue(q => q.map(i => i.id === item.id ? { ...i, status: 'success', result: ocr.data } : i))
    } catch (err: any) {
      setQueue(q => q.map(i => i.id === item.id ? { ...i, status: 'error', error: err.message } : i))
    }
  }

  const uploadAll = () => queue.filter(i => i.status === 'pending').forEach(processFile)
  const remove = (id: string) => setQueue(q => q.filter(i => i.id !== id))

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Nahrát dokumenty</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Nahrajte faktury — AI automaticky vytěží data a předá účetnímu ke schválení.</p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${dragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
      >
        <input ref={inputRef} type="file" multiple accept=".pdf,image/*" className="hidden" onChange={e => e.target.files && addFiles(e.target.files)} />
        <CloudUpload className={`w-12 h-12 mx-auto mb-4 ${dragging ? 'text-indigo-500' : 'text-slate-400'}`} />
        <p className="font-semibold text-slate-700 dark:text-slate-300 text-lg">Přetáhněte soubory sem</p>
        <p className="text-slate-400 mt-1 text-sm">nebo klikněte pro výběr · PDF, JPG, PNG · max 10 MB</p>
      </div>

      {/* Queue */}
      {queue.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-slate-900 dark:text-slate-50">{queue.length} soubor{queue.length > 1 ? 'y' : ''}</h2>
            {queue.some(i => i.status === 'pending') && (
              <button onClick={uploadAll} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-md shadow-indigo-500/20">
                <Upload className="w-4 h-4" /> Zpracovat vše
              </button>
            )}
          </div>

          {queue.map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">{item.file.name}</p>
                    <p className="text-xs text-slate-400">{(item.file.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.status === 'pending' && (
                    <button onClick={() => processFile(item)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 px-3 py-1.5 rounded-lg transition">
                      Zpracovat
                    </button>
                  )}
                  {item.status === 'uploading' && <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />}
                  {item.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {item.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                  <button onClick={() => remove(item.id)} className="text-slate-400 hover:text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {item.status === 'uploading' && (
                <div className="mt-3 text-xs text-indigo-500 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin" /> Extrahuji data pomocí AI...
                </div>
              )}
              {item.status === 'success' && item.result && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(item.result).filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="bg-emerald-50 dark:bg-emerald-500/10 rounded-lg px-3 py-2">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{String(v)}</p>
                    </div>
                  ))}
                </div>
              )}
              {item.status === 'error' && (
                <p className="mt-2 text-xs text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-3 py-2">{item.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
