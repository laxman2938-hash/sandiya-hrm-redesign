# 🔧 Fix for Vercel Upload Error - Quick Start

## Your Error
```
❌ Upload failed: Server configuration error: Supabase credentials not set
```

## The Problem in 30 Seconds
Your `.env.local` file has Supabase credentials but isn't pushed to GitHub (it's in `.gitignore`).
When Vercel deploys, it can't find these credentials, so uploads fail.

## The Fix in 3 Minutes

### 1. Go to Vercel Dashboard
👉 https://vercel.com/dashboard → sandiya-hrm-redesign → Settings

### 2. Click "Environment Variables" (Left Sidebar)

### 3. Add These 4 Variables

**Copy-Paste These Exactly:**

```
NEXT_PUBLIC_SUPABASE_URL
https://twsrrrejfpdqrptspgyh.supabase.co

---

SUPABASE_SERVICE_ROLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3c3JycmVqZnBkcXJwdHNwZ3loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIyMjYwNSwiZXhwIjoyMDc2Nzk4NjA1fQ.F9t5pPL4x-R0Zu2T2jPc90nHegykyiVjEODHMVC_elA

---

DATABASE_URL
postgresql://postgres.twsrrrejfpdqrptspgyh:hellouser@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true&statement_cache_size=0

---

DIRECT_URL
postgresql://postgres.twsrrrejfpdqrptspgyh:hellouser@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require
```

### 4. For Each Variable:
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click: Save

### 5. Redeploy
- Go to Deployments tab
- Click Latest Deployment → ... → Redeploy
- Wait 2-3 minutes

### 6. Test
- Visit your Vercel site
- Try uploading a file
- ✅ It should work!

---

## Need Details?
📖 Full guide: `VERCEL_ENV_SETUP.md` (in your repo)

## Done! 🎉
Your uploads will now work on Vercel!
