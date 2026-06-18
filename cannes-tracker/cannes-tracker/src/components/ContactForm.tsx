'use client'
import { useState } from 'react'
import { Contact, Priority } from '@/lib/types'

interface ContactFormProps {
  contact?: Contact | null
  onSave: (data: Partial<Contact>) => Promise<void>
  onDelete?: () => Promise<void>
  onClose: () => void
}

const priorities: Priority[] = ['Hot', 'Warm', 'Cold']

export default function ContactForm({ contact, onSave, onDelete, onClose }: ContactFormProps) {
  const [name, setName] = useState(contact?.name ?? '')
  const [company, setCompany] = useState(contact?.company ?? '')
  const [role, setRole] = useState(contact?.role ?? '')
  const [priority, setPriority] = useState<Priority>(contact?.priority ?? 'Warm')
  const [notes, setNotes] = useState(contact?.notes ?? '')
  const [nextSteps, setNextSteps] = useState(contact?.next_steps ?? '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!name.trim()) return
    setSaving(true)
    await onSave({ name, company, role, priority, notes, next_steps: nextSteps })
    setSaving(false)
  }

  function priClass(p: Priority) {
    const base = 'flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wide rounded-xl border transition-colors'
    if (p === priority) {
      if (p === 'Hot') return `${base} bg-blurple/15 text-paid-purple border-paid-purple/35`
      if (p === 'Warm') return `${base} bg-cannes-gold/15 text-cannes-gold border-cannes-gold/30`
      return `${base} bg-teal-200/10 text-teal-200 border-teal-200/20`
    }
    return `${base} bg-paid-card text-white/30 border-white/10`
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paid-black">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-cannes-gold/30 flex-shrink-0">
        <button onClick={onClose} className="btn-ghost">Cancel</button>
        <span className="text-sm font-bold text-paid-white">
          {contact ? 'Edit contact' : 'New contact'}
        </span>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-5 pb-24">
        <div>
          <label className="field-label">Name</label>
          <input className="input-base" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" autoComplete="off" />
        </div>
        <div>
          <label className="field-label">Company</label>
          <input className="input-base" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" autoComplete="off" />
        </div>
        <div>
          <label className="field-label">Role</label>
          <input className="input-base" value={role} onChange={e => setRole(e.target.value)} placeholder="Title / role" autoComplete="off" />
        </div>
        <div>
          <label className="field-label">Priority</label>
          <div className="flex gap-2">
            {priorities.map(p => (
              <button key={p} className={priClass(p)} onClick={() => setPriority(p)}>{p}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="field-label">Notes</label>
          <textarea className="input-base min-h-[88px] resize-none leading-relaxed" value={notes} onChange={e => setNotes(e.target.value)} placeholder="What did you talk about?" />
        </div>
        <div>
          <label className="field-label">Next steps</label>
          <textarea className="input-base min-h-[72px] resize-none leading-relaxed" value={nextSteps} onChange={e => setNextSteps(e.target.value)} placeholder="What needs to happen after Cannes?" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-paid-black border-t border-white/10 flex gap-3">
        {contact && onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-3.5 border border-white/10 rounded-xl text-white/40 font-bold text-sm active:text-paid-purple transition-colors"
          >
            🗑
          </button>
        )}
        <button onClick={handleSave} disabled={saving || !name.trim()} className="btn-primary disabled:opacity-40">
          {saving ? 'Saving...' : 'Save contact'}
        </button>
      </div>
    </div>
  )
}
