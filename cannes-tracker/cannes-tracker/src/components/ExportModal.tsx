'use client'
import { Contact } from '@/lib/types'

interface ExportModalProps {
  myContacts: Contact[]
  allContacts: Contact[]
  onClose: () => void
}

function toCSV(contacts: Contact[]) {
  const headers = ['Name', 'Company', 'Role', 'Priority', 'Notes', 'Next Steps', 'Logged By', 'Email', 'Date']
  const rows = contacts.map(c => [
    c.name, c.company, c.role, c.priority, c.notes, c.next_steps,
    c.user_name, c.user_email,
    new Date(c.created_at).toLocaleString('en-GB'),
  ].map(v => `"${(v || '').replace(/"/g, '""')}"`).join(','))
  return [headers.join(','), ...rows].join('\n')
}

function download(csv: string, filename: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = filename
  a.click()
}

export default function ExportModal({ myContacts, allContacts, onClose }: ExportModalProps) {
  const hot = allContacts.filter(c => c.priority === 'Hot').length
  const warm = allContacts.filter(c => c.priority === 'Warm').length
  const cold = allContacts.filter(c => c.priority === 'Cold').length

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paid-black">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-cannes-gold/30 flex-shrink-0">
        <button onClick={onClose} className="btn-ghost">Back</button>
        <span className="text-sm font-bold text-paid-white">Export</span>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total', value: allContacts.length, color: 'text-paid-white' },
            { label: 'Hot', value: hot, color: 'text-paid-purple' },
            { label: 'Warm', value: warm, color: 'text-cannes-gold' },
            { label: 'Cold', value: cold, color: 'text-teal-200' },
          ].map(s => (
            <div key={s.label} className="card text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-cannes-gold/20" />

        <div className="card text-sm text-white/50 leading-relaxed">
          Downloads a CSV. In Google Sheets: File &gt; Import &gt; Upload — columns map automatically.
        </div>

        <button
          onClick={() => download(toCSV(myContacts), 'my_cannes26_contacts.csv')}
          className="btn-primary"
        >
          Download my contacts ({myContacts.length})
        </button>

        <button
          onClick={() => download(toCSV(allContacts), 'team_cannes26_contacts.csv')}
          className="btn-gold"
        >
          Download full team ({allContacts.length})
        </button>
      </div>
    </div>
  )
}
