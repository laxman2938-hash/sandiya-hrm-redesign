# 🚀 Quick Setup: Neon Database + Vercel Deployment

Since Vercel Postgres isn't available in your region, **Neon** is the best alternative. Here's a step-by-step guide:

## Step 1: Create Neon Database (2 minutes)

1. **Go to [https://neon.tech](https://neon.tech)**
2. **Sign up** with GitHub (easiest)
3. **Create New Project**:
   - Project name: `sandiya-hrm`
   - Region: Choose closest to your users (probably US East or Europe)
   - PostgreSQL version: Keep default (16)
4. **Click "Create Project"**

## Step 2: Get Connection Strings

After project creation, you'll see:

1. **Copy the connection string** (it looks like this):
   ```bash
   postgresql://username:password@ep-abc123.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

2. **You need this SAME URL for both DATABASE_URL and DIRECT_URL**

## Step 3: Set Environment Variables in Vercel

1. **Go to Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. **Add these 5 variables** (set for Production, Preview, Development):

```bash
CLOUDINARY_CLOUD_NAME = djtnwletk
CLOUDINARY_API_KEY = 842752279286447
CLOUDINARY_API_SECRET = VLicln3-Rc01idjM6O5cHwQKDqc
DATABASE_URL = postgresql://username:password@ep-abc123.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL = postgresql://username:password@ep-abc123.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**(Replace the DATABASE_URL and DIRECT_URL with your actual Neon connection string)**

## Step 4: Deploy

1. **Push your code to GitHub** (if not already done)
2. **Connect repository to Vercel** (if not already done)
3. **Redeploy** - Vercel will run `prisma migrate deploy` automatically
4. **Your app is live!**

## Alternative: Supabase Database

If you prefer Supabase:

1. **Go to [https://supabase.com](https://supabase.com)**
2. **Create new project**
3. **Go to Settings → Database**
4. **Copy "Connection string" and "Direct connection"**
5. **Use these as DATABASE_URL and DIRECT_URL**

## Why Neon is Great:

- ✅ **Free tier**: 512MB storage, 3GB data transfer
- ✅ **Serverless**: Automatically pauses when not in use
- ✅ **Fast**: Built for modern apps
- ✅ **Reliable**: Used by many production apps
- ✅ **Easy setup**: 2-minute setup vs hours with other providers

## Your Local .env.local should have:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=djtnwletk
CLOUDINARY_API_KEY=842752279286447
CLOUDINARY_API_SECRET=VLicln3-Rc01idjM6O5cHwQKDqc
CLOUDINARY_URL=cloudinary://842752279286447:VLicln3-Rc01idjM6O5cHwQKDqc@djtnwletk

# Database URLs (replace with your Neon URLs for local testing)
DATABASE_URL="postgresql://postgres:password@localhost:5432/sandiya_hr"
DIRECT_URL="postgresql://postgres:password@localhost:5432/sandiya_hr"
```

## 🎯 Summary:
1. Create Neon database (2 min)
2. Copy connection string 
3. Add 5 environment variables to Vercel
4. Deploy!

Your Cloudinary setup is already perfect for production!