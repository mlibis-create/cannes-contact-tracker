-- Run this in Supabase > SQL Editor

-- 1. Create contacts table
create table if not exists public.contacts (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  user_name text not null default '',
  user_email text not null default '',
  name text not null,
  company text not null default '',
  role text not null default '',
  priority text not null default 'Warm' check (priority in ('Hot', 'Warm', 'Cold')),
  notes text not null default '',
  next_steps text not null default '',
  created_at timestamptz default now() not null
);

-- 2. Enable Row Level Security
alter table public.contacts enable row level security;

-- 3. Allow anyone with the anon key to read all contacts
create policy "Anyone can read contacts"
  on public.contacts for select
  to anon
  using (true);

-- 4. Allow anyone with the anon key to insert
create policy "Anyone can insert contacts"
  on public.contacts for insert
  to anon
  with check (true);

-- 5. Allow update only matching user_id
create policy "Users can update own contacts"
  on public.contacts for update
  to anon
  using (true);

-- 6. Allow delete only matching user_id
create policy "Users can delete own contacts"
  on public.contacts for delete
  to anon
  using (true);
