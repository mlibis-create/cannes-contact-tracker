# #paid — Cannes Lions '26 Contact Tracker

## Stack
Next.js 14 · Supabase (database) · Vercel · Tailwind

---

## Setup (10 minutes total)

### 1. Supabase — create the table (2 min)

1. Go to your Supabase project > **SQL Editor**
2. Paste the entire contents of `supabase-setup.sql`
3. Click **Run** — you should see "Success"

### 2. Push to GitHub (2 min)

```bash
cd cannes-tracker
git init
git add .
git commit -m "init: cannes contact tracker"
git remote add origin https://github.com/YOUR_ORG/cannes-tracker.git
git push -u origin main
```

> Note: `.env.local` is in `.gitignore` so your keys won't be committed.

### 3. Deploy to Vercel (3 min)

1. Go to [vercel.com](https://vercel.com) > **Add New Project**
2. Import your GitHub repo
3. Add these **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://ejhwgitdiyevtbyngtlx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Click **Deploy**
5. Share the Vercel URL with the team

### 4. Add Vercel URL to Supabase (1 min)

1. Go to Supabase > **Authentication** > **URL Configuration**
2. Add your Vercel URL to **Allowed Origins** (for CORS)

---

## How it works

- Each person selects their name from a dropdown on first visit
- Their name is saved in localStorage — no login required
- All contacts are stored in Supabase and visible to the whole team
- Each person can only edit/delete their own entries
- Export: download your own contacts or the full team CSV

---

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```
