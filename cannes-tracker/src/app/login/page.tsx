'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TEAM } from '@/lib/team'

export default function LoginPage() {
  const router = useRouter()
  const [selected, setSelected] = useState('')
  const [error, setError] = useState(false)

  function handleGo() {
    if (!selected) { setError(true); return }
    localStorage.setItem('cannes_user_id', selected)
    const member = TEAM.find(t => t.id === selected)
    if (member) localStorage.setItem('cannes_user_name', member.name)
    router.push('/contacts')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-paid-black">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blurple flex items-center justify-center text-xl font-bold text-white">
            #p
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-paid-white">#paid</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-cannes-gold mt-1">
              Cannes Lions &apos;26
            </p>
          </div>
        </div>

        <div className="w-full border-t border-cannes-gold/20" />

        <div className="w-full flex flex-col gap-4">
          <p className="text-sm text-white/50 text-center">Who are you?</p>

          <div className="relative">
            <select
              value={selected}
              onChange={e => { setSelected(e.target.value); setError(false) }}
              className={`w-full px-4 py-3.5 bg-paid-card border rounded-xl text-sm font-bold appearance-none outline-none transition-colors cursor-pointer
                ${error ? 'border-red-500/60 text-red-400' : selected ? 'border-cannes-gold/40 text-paid-white' : 'border-white/10 text-white/30'}`}
            >
              <option value="" disabled>Select your name...</option>
              {TEAM.sort((a, b) => a.name.localeCompare(b.name)).map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xs">▼</div>
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center -mt-2">Pick your name to continue</p>
          )}

          <button
            onClick={handleGo}
            className="btn-primary mt-1"
          >
            Let&apos;s go →
          </button>
        </div>

        <p className="text-[11px] text-white/20 text-center">
          Your contacts will be tagged to your name automatically.
        </p>
      </div>
    </div>
  )
}
