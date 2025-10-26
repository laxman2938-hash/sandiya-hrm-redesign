# 🚀 Vercel Deployment Guide - Fix Upload Error

## Problem
```
❌ Upload failed: Server configuration error: Supabase credentials not set. 
   Please contact administrator.
```

## Why This Happens
Your `.env.local` file contains sensitive credentials and is **NOT** pushed to GitHub (it's in `.gitignore`). When Vercel deploys your project, it doesn't have access to these credentials, so file uploads fail.

---

## ✅ Solution: Add Environment Variables to Vercel (5 minutes)

### Step 1: Prepare Your Credentials

Your credentials are already in your local `.env` and `.env.local` files:

**From `.env.local`:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://twsrrrejfpdqrptspgyh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3c3JycmVqZnBkcXJwdHNwZ3loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIyMjYwNSwiZXhwIjoyMDc2Nzk4NjA1fQ.F9t5pPL4x-R0Zu2T2jPc90nHegykyiVjEODHMVC_elA
```

**From `.env`:**
```bash
DATABASE_URL=postgresql://postgres.twsrrrejfpdqrptspgyh:hellouser@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true&statement_cache_size=0
DIRECT_URL=postgresql://postgres.twsrrrejfpdqrptspgyh:hellouser@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require
```

### Step 2: Access Vercel Project Settings

1. Go to **https://vercel.com/dashboard**
2. Select your project: **sandiya-hrm-redesign**
3. Click **Settings** (top navigation bar)
4. Click **Environment Variables** (left sidebar)

### Step 3: Add All 4 Environment Variables

For each variable below:
- Click **Add New**
- Enter the name and value
- Select environments: **Production, Preview, Development** (check all three)
- Click **Save**

#### Variable 1️⃣
```
Name:  NEXT_PUBLIC_SUPABASE_URL
Value: https://twsrrrejfpdqrptspgyh.supabase.co
```

#### Variable 2️⃣
```
Name:  SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3c3JycmVqZnBkcXJwdHNwZ3loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIyMjYwNSwiZXhwIjoyMDc2Nzk4NjA1fQ.F9t5pPL4x-R0Zu2T2jPc90nHegykyiVjEODHMVC_elA
```

#### Variable 3️⃣
```
Name:  DATABASE_URL
Value: postgresql://postgres.twsrrrejfpdqrptspgyh:hellouser@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true&statement_cache_size=0
```

#### Variable 4️⃣
```
Name:  DIRECT_URL
Value: postgresql://postgres.twsrrrejfpdqrptspgyh:hellouser@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require
```

### Step 4: Redeploy Your Project

After adding all variables:

1. Go to **Deployments** tab (top navigation)
2. Find your latest deployment (usually shows "Production")
3. Click the **...** menu → **Redeploy**
4. Wait ~2-3 minutes for deployment to complete
5. Check **Build Log** if there are any errors

### Step 5: Test Your Deployment

Once deployment completes:
1. Visit your live site on Vercel
2. Try uploading an image (Feedback form, Candidate form, or Gallery)
3. Check that image uploads successfully
4. Verify forms submit to database

---

## 📋 What Each Variable Does

| Variable | Purpose | Visibility |
|----------|---------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase endpoint | Safe to expose (seen in browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side authentication | 🔒 Secret (keep private) |
| `DATABASE_URL` | Pooled database connection | 🔒 Secret (for API routes) |
| `DIRECT_URL` | Direct database connection | 🔒 Secret (for migrations) |

---

## 🔒 Security Notes

- ✅ Your `.env.local` is in `.gitignore` - won't be committed to GitHub
- ✅ These credentials only need to be in Vercel, not in code
- ✅ The service role key should only be on server-side (it is)
- ✅ Use Vercel's "Protected" option for extra security if needed

---

## ❓ Troubleshooting

### Upload Still Fails After Redeploy?

**Check 1: Verify All Variables Are Set**
```
Settings → Environment Variables
→ Confirm all 4 variables are listed
→ Verify values have no extra spaces
```

**Check 2: Check Build Logs**
```
Deployments → Latest Deployment → Logs
→ Look for "Build failed" or error messages
```

**Check 3: Check Supabase Status**
- Visit https://status.supabase.com
- Confirm service is running (not down for maintenance)

**Check 4: Restart Deployment**
```
Deployments → Latest Deployment → ... → Redeploy
```

---

## 🎯 Alternative: Push Code to Re-trigger Deployment

If you want to redeploy without manually clicking:

```bash
git add .
git commit -m "chore: trigger vercel redeployment with env vars"
git push origin main
```

This automatically triggers a new Vercel deployment.

---

## ✨ After This Works

Once file uploads work on Vercel:
- ✅ Feedback forms with attachments
- ✅ Candidate submissions with resume uploads
- ✅ Gallery image uploads
- ✅ All features fully functional

Your site is now production-ready! 🚀
