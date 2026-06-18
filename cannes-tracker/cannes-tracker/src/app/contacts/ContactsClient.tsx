'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Contact, Priority } from '@/lib/types'
import Topbar from '@/components/Topbar'
import ContactCard from '@/components/ContactCard'
import ContactForm from '@/components/ContactForm'
import ContactDetail from '@/components/ContactDetail'
import ExportModal from '@/components/ExportModal'

type Filter = 'All' | Priority

interface ContactsClientProps {
  userId: string
  userName: string
  userEmail: string
}

export default function ContactsClient({ userId, userName }: ContactsClientProps) {
  const supabase = createClient()
  const [view, setView] = useState<'my' | 'team'>('my')
  const [filter, setFilter] = useState<Filter>('All')
  const [myContacts, setMyContacts] = useState<Contact[]>([])
  const [allContacts, setAllContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editContact, setEditContact] = useState<Contact | null>(null)
  const [detailContact, setDetailContact] = useState<Contact | null>(null)
  const [showExport, setShowExport] = useState(false)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    const [myRes, allRes] = await Promise.all([
      supabase.from('contacts').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
    ])
    setMyContacts(myRes.data ?? [])
    setAllContacts(allRes.data ?? [])
    setLoading(false)
  }, [userId, supabase])

  useEffect(() => { fetchContacts() }, [fetchContacts])

  const displayed = view === 'my' ? myContacts : allContacts
  const filtered = filter === 'All' ? displayed : displayed.filter(c => c.priority === filter)

  async function handleSave(data: Partial<Contact>) {
    if (editContact) {
      await supabase.from('contacts').update(data).eq('id', editContact.id).eq('user_id', userId)
    } else {
      await supabase.from('contacts').insert({
        ...data,
        user_id: userId,
        user_name: userName,
        user_email: userId,
      })
    }
    setShowForm(false)
    setEditContact(null)
    fetchContacts()
  }

  async function handleDelete() {
    if (!editContact) return
    await supabase.from('contacts').delete().eq('id', editContact.id).eq('user_id', userId)
    setShowForm(false)
    setEditContact(null)
    setDetailContact(null)
    fetchContacts()
  }

  function openEdit(c: Contact) {
    setDetailContact(null)
    setEditContact(c)
    setShowForm(true)
  }

  const filters: Filter[] = ['All', 'Hot', 'Warm', 'Cold']

  return (
    <div className="min-h-screen flex flex-col bg-paid-black">
      <Topbar userName={userName} view={view} onViewChange={v => { setView(v); setFilter('All') }} />

      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 flex-shrink-0 overflow-x-auto">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-full border transition-colors whitespace-nowrap ${
              filter === f
                ? f === 'Hot' ? 'bg-blurple/15 text-paid-purple border-paid-purple/30'
                  : f === 'Warm' ? 'bg-cannes-gold/15 text-cannes-gold border-cannes-gold/30'
                  : f === 'Cold' ? 'bg-teal-200/10 text-teal-200 border-teal-200/20'
                  : 'bg-white/10 text-paid-white border-white/20'
                : 'bg-transparent text-white/30 border-white/10'
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => setShowExport(true)}
          className="ml-auto text-paid-purple text-[11px] font-bold uppercase tracking-wide whitespace-nowrap"
        >
          Export ↓
        </button>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3 pb-28">
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-16">
            <p className="text-sm text-white/30">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <p className="text-4xl opacity-20">📇</p>
            <p className="text-sm text-white/40 leading-relaxed">
              {view === 'team' ? 'No team contacts yet.' : 'No contacts yet.'}<br />
              Tap below to add your first.
            </p>
          </div>
        ) : (
          filtered.map(c => (
            <ContactCard
              key={c.id}
              contact={c}
              showOwner={view === 'team'}
              onClick={() => setDetailContact(c)}
            />
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gradient-to-t from-paid-black via-paid-black/95 to-transparent">
        <button
          onClick={() => { setEditContact(null); setShowForm(true) }}
          className="btn-primary flex items-center justify-center gap-2 text-base"
        >
          + Add contact
        </button>
      </div>

      {showForm && (
        <ContactForm
          contact={editContact}
          onSave={handleSave}
          onDelete={editContact ? handleDelete : undefined}
          onClose={() => { setShowForm(false); setEditContact(null) }}
        />
      )}

      {detailContact && (
        <ContactDetail
          contact={detailContact}
          canEdit={detailContact.user_id === userId}
          onEdit={() => openEdit(detailContact)}
          onClose={() => setDetailContact(null)}
        />
      )}

      {showExport && (
        <ExportModal
          myContacts={myContacts}
          allContacts={allContacts}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  )
}
