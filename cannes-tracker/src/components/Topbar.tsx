'use client'
import { useRouter } from 'next/navigation'

interface TopbarProps {
  userName?: string
  view: 'my' | 'team'
  onViewChange: (v: 'my' | 'team') => void
}

export default function Topbar({ userName, view, onViewChange }: TopbarProps) {
  const router = useRouter()

  function switchUser() {
    localStorage.removeItem('cannes_user_id')
    localStorage.removeItem('cannes_user_name')
    router.push('/login')
  }

  const firstName = userName?.split(' ')[0] || 'You'

  return (
    <div className="bg-paid-black sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-cannes-gold/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blurple flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
            #p
          </div>
          <span className="text-sm font-bold text-paid-white">#paid</span>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-widest text-cannes-gold border border-cannes-gold/30 px-2.5 py-1 rounded-full">
          Cannes Lions &apos;26
        </span>

        <button
          onClick={switchUser}
          className="text-[11px] text-white/40 font-bold active:text-white/70 transition-colors"
          title="Switch user"
        >
          {firstName} ↩
        </button>
      </div>

      <div className="flex bg-paid-card border-b border-white/10">
        <button
          onClick={() => onViewChange('my')}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-colors ${
            view === 'my'
              ? 'text-cannes-gold border-cannes-gold'
              : 'text-white/40 border-transparent'
          }`}
        >
          My contacts
        </button>
        <button
          onClick={() => onViewChange('team')}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-colors ${
            view === 'team'
              ? 'text-cannes-gold border-cannes-gold'
              : 'text-white/40 border-transparent'
          }`}
        >
          Team
        </button>
      </div>
    </div>
  )
}
