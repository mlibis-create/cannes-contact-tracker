import { Contact, Priority } from '@/lib/types'

function initials(name: string) {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function chipClass(p: Priority) {
  if (p === 'Hot') return 'chip chip-hot'
  if (p === 'Warm') return 'chip chip-warm'
  return 'chip chip-cold'
}

interface ContactCardProps {
  contact: Contact
  showOwner?: boolean
  onClick: () => void
}

export default function ContactCard({ contact, showOwner, onClick }: ContactCardProps) {
  const date = new Date(contact.created_at).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  })

  return (
    <button
      onClick={onClick}
      className="card w-full text-left flex gap-3 active:border-cannes-gold/40 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-blurple/15 border border-paid-purple/25 flex items-center justify-center text-xs font-bold text-paid-purple flex-shrink-0">
        {initials(contact.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-bold text-paid-white leading-tight">{contact.name}</p>
          <span className={chipClass(contact.priority)}>{contact.priority}</span>
        </div>
        {(contact.role || contact.company) && (
          <p className="text-xs text-white/50 mt-0.5 truncate">
            {[contact.role, contact.company].filter(Boolean).join(' · ')}
          </p>
        )}
        {contact.notes && (
          <p className="text-xs text-white/25 mt-1 truncate">{contact.notes}</p>
        )}
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[10px] text-white/20">{date}</p>
          {showOwner && (
            <p className="text-[10px] text-white/30 truncate ml-2">{contact.user_name}</p>
          )}
        </div>
      </div>
    </button>
  )
}
