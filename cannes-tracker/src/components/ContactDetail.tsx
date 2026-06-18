import { Contact, Priority } from '@/lib/types'

function chipClass(p: Priority) {
  if (p === 'Hot') return 'chip chip-hot'
  if (p === 'Warm') return 'chip chip-warm'
  return 'chip chip-cold'
}

function initials(name: string) {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

interface ContactDetailProps {
  contact: Contact
  canEdit: boolean
  onEdit: () => void
  onClose: () => void
}

export default function ContactDetail({ contact, canEdit, onEdit, onClose }: ContactDetailProps) {
  const date = new Date(contact.created_at).toLocaleString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paid-black">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-cannes-gold/30 flex-shrink-0">
        <button onClick={onClose} className="btn-ghost">Back</button>
        <span className="text-sm font-bold text-paid-white">Contact</span>
        {canEdit
          ? <button onClick={onEdit} className="btn-ghost">Edit</button>
          : <div className="w-16" />
        }
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-5 flex items-start gap-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-blurple/15 border border-paid-purple/25 flex items-center justify-center text-base font-bold text-paid-purple flex-shrink-0">
            {initials(contact.name)}
          </div>
          <div>
            <p className="text-lg font-bold text-paid-white">{contact.name}</p>
            {(contact.role || contact.company) && (
              <p className="text-sm text-white/50 mt-0.5">
                {[contact.role, contact.company].filter(Boolean).join(' at ')}
              </p>
            )}
            <div className="mt-2">
              <span className={chipClass(contact.priority)}>{contact.priority}</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 flex flex-col gap-5">
          {contact.notes && (
            <div>
              <p className="field-label">Notes</p>
              <div className="border-t border-white/10 mt-1 pt-3">
                <p className="text-sm text-paid-white leading-relaxed">{contact.notes}</p>
              </div>
            </div>
          )}
          {contact.next_steps && (
            <div>
              <p className="field-label">Next steps</p>
              <div className="border-t border-white/10 mt-1 pt-3">
                <p className="text-sm text-paid-white leading-relaxed">{contact.next_steps}</p>
              </div>
            </div>
          )}
          <div>
            <p className="field-label">Logged by</p>
            <div className="border-t border-white/10 mt-1 pt-3">
              <p className="text-sm text-paid-white">{contact.user_name}</p>
              <p className="text-xs text-white/40 mt-0.5">{contact.user_email}</p>
            </div>
          </div>
          <div>
            <p className="field-label">Date</p>
            <div className="border-t border-white/10 mt-1 pt-3">
              <p className="text-sm text-paid-white">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
