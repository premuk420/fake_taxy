import Link from 'next/link'
import { ArrowRight, FileText, Zap, Shield, CheckCircle, Upload, Brain, Download } from 'lucide-react'

const features = [
  {
    icon: Upload,
    title: 'Nahrání dokumentů',
    desc: 'Přetáhněte PDF nebo JPG fakturu. Podporujeme všechny formáty.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Brain,
    title: 'AI extrakce dat',
    desc: 'Náš OCR engine s Llama AI automaticky vytěží IČO, DIČ, částky a termíny.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: CheckCircle,
    title: 'Schválení účetním',
    desc: 'Účetní zkontroluje a potvrdí nebo upraví extrahovaná data jedním klikem.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Download,
    title: 'Export ISDOC',
    desc: 'Automatický export do formátu ISDOC pro ERP systémy a finanční úřad.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
]

const pricing = [
  {
    name: 'Starter',
    price: 'Zdarma',
    desc: 'Pro jednotlivce a OSVČ',
    features: ['5 faktur / měsíc', 'AI OCR extrakce', 'Klientský portál', 'Email podpora'],
    cta: 'Začít zdarma',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '990 Kč',
    period: '/ měsíc',
    desc: 'Pro účetní firmy',
    features: ['Neomezené faktury', 'Správa klientů', 'Kanban úkolů', 'ISDOC export', 'Prioritní podpora'],
    cta: 'Vyzkoušet 14 dní',
    highlight: true,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-sm font-bold">FT</div>
            FakeTaxy
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-slate-400 hover:text-white text-sm font-medium transition px-4 py-2">
              Přihlásit se
            </Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-500/20">
              Začít zdarma
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-sm text-indigo-300 font-medium mb-8">
            <Zap className="w-4 h-4" />
            AI-powered účetnictví pro českou malou firmu
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Faktury zpracované{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              za sekundy
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nahrajte fakturu, naše AI vytěží IČO, DIČ, částky a termíny. Váš účetní schválí,
            systém exportuje ISDOC. Žádné ruční přepisování.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-xl shadow-indigo-500/25 text-lg"
            >
              Začít zdarma <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition text-lg"
            >
              Přihlásit se
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jak to funguje?</h2>
            <p className="text-slate-400 text-lg">Od nahrání faktury po export do 4 krocích</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition group">
                <div className={`w-12 h-12 ${f.bg} ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Krok {i + 1}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparentní ceny</h2>
            <p className="text-slate-400 text-lg">Žádné skryté poplatky</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {pricing.map((plan) => (
              <div key={plan.name} className={`rounded-3xl p-8 border flex flex-col ${plan.highlight ? 'bg-indigo-600/10 border-indigo-500/40' : 'bg-white/3 border-white/10'}`}>
                <div className="mb-6">
                  <div className="font-bold text-xl mb-1">{plan.name}</div>
                  <div className="text-slate-400 text-sm">{plan.desc}</div>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 ml-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`w-full py-3 rounded-xl font-semibold text-center transition ${plan.highlight ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25' : 'bg-white/10 hover:bg-white/15 text-white'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 text-slate-400">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-sm">Data uložena na serverech v EU · GDPR compliant</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Připraveni začít?</h2>
          <p className="text-slate-400 mb-8">Registrace trvá 30 sekund. Žádná kreditní karta.</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl transition shadow-xl shadow-indigo-500/25 text-lg"
          >
            Vytvořit bezplatný účet <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-slate-600 text-sm">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-400 mb-2">
          <FileText className="w-4 h-4" />
          FakeTaxy &copy; {new Date().getFullYear()}
        </div>
        <p>B2B účetní SaaS pro českou malou firmu</p>
      </footer>
    </div>
  )
}
