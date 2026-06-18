export type Priority = 'Hot' | 'Warm' | 'Cold'

export interface Contact {
  id: string
  user_id: string
  user_name: string
  user_email: string
  name: string
  company: string
  role: string
  priority: Priority
  notes: string
  next_steps: string
  created_at: string
}
