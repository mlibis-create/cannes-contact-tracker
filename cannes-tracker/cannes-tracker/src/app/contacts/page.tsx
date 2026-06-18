'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TEAM } from '@/lib/team'
import ContactsClient from './ContactsClient'

export default function ContactsPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('cannes_user_id')
    const name = localStorage.getItem('cannes_user_name')
    const member = TEAM.find((t) => t.id === id)
    if (!id || !member) {
      router.replace('/login')
      return
    }
    setUserId(id)
    setUserName(name || member.name)
    setReady(true)
  }, [router])

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center bg-paid-black">
      <p className="text-white/30 text-sm">Loading...</p>
    </div>
  )

  return <ContactsClient userId={userId} userName={userName} userEmail={userId} />
}
