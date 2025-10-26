# Vercel Deployment - Environment Variables Setup

## Issue
When deployed to Vercel, you get: "Server configuration error: Supabase credentials not set"

## Root Cause
The `.env.local` file is in `.gitignore` and is NOT pushed to GitHub, so Vercel doesn't have access to your Supabase credentials.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Your Vercel Project Dashboard
1. Open https://vercel.com/dashboard
2. Select your project: **sandiya-hrm-redesign**
3. Click on **Settings** tab
4. Go to **Environment Variables** (left sidebar)

### Step 2: Add the Required Environment Variables

Add these 3 environment variables:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://twsrrrejfpdqrptspgyh.supabase.co`
- **Environment:** Production, Preview, Development (select all)

#### Variable 2: SUPABASE_SERVICE_ROLE_KEY
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3c3JycmVqZnBkcXJwdHNwZ3loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIyMjYwNSwiZXhwIjoyMDc2Nzk4NjA1fQ.F9t5pPL4x-R0Zu2T2jPc90nHegykyiVjEODHMVC_elA`
- **Environment:** Production, Preview, Development (select all)

#### Variable 3: DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** (Get from `.env` file - the full PostgreSQL connection string)
- **Environment:** Production, Preview, Development (select all)

#### Variable 4: DIRECT_URL
- **Name:** `DIRECT_URL`
- **Value:** (Get from `.env` file - same as DATABASE_URL for Supabase)
- **Environment:** Production, Preview, Development (select all)

### Step 3: Redeploy on Vercel
1. After adding environment variables, go to **Deployments** tab
2. Find your latest deployment
3. Click **Redeploy** or push a new commit to trigger automatic redeploy
4. Wait for deployment to complete (~2-3 minutes)

## Why This Works

- `NEXT_PUBLIC_SUPABASE_URL`: Public Supabase URL (safe to expose, used in browser)
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for server-side operations (must be kept private)
- `DATABASE_URL`: PostgreSQL connection string for Prisma ORM
- `DIRECT_URL`: Direct database connection URL

## Security Considerations

⚠️ **IMPORTANT:**
- Never commit `.env.local` to GitHub (already in `.gitignore`)
- The `SUPABASE_SERVICE_ROLE_KEY` is sensitive - only add to Vercel, not to client-side code
- For extra security, consider using Vercel's protected environment variables

## Testing Deployment

After redeployment:
1. Visit your live site on Vercel
2. Try uploading an image to test Supabase connectivity
3. Try submitting the feedback/candidate forms
4. Check admin dashboard to verify database connections work

## If Still Getting Errors

1. **Check Build Logs**: In Vercel dashboard → Deployments → Select deployment → Logs
2. **Verify Environment Variables**: Settings → Environment Variables → Confirm all 4 variables are set
3. **Check Supabase Status**: Visit https://status.supabase.com to ensure service is running
4. **Verify Credentials**: Copy-paste the exact values from `.env.local` without extra spaces

## Quick Reference

Get these values from:

```bash
# From .env file:
cat .env

# From .env.local file:
cat .env.local
```

Then paste them exactly as shown into Vercel Environment Variables.
