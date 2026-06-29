# Deployment Guide

The website is optimized for deployment on Vercel.

## Steps for Vercel Deployment

1. **Push to GitHub:**
   Commit all changes and push the repository to GitHub.

2. **Import Project to Vercel:**
   - Log in to the Vercel Dashboard.
   - Click **Add New > Project**.
   - Select your repository.

3. **Configure Environment Variables:**
   Under the **Environment Variables** section, add:
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`: Your deployed Apps Script Web App URL.

4. **Deploy:**
   Click **Deploy**. Vercel will build the Next.js application and serve it.

5. **Add Custom Domain:**
   - Go to **Project Settings > Domains**.
   - Enter your domain (e.g., `parthprajapati.com`).
   - Configure DNS records (CNAME/A) with your domain registrar as instructed by Vercel.
