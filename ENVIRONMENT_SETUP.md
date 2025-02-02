# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Required: Clerk authentication keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Optional: Customize Clerk behavior
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/notes
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/notes
```

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Clear Existing Cache**
   ```bash
   # Remove Next.js cache
   rm -rf .next
   # Remove npm cache (optional)
   npm cache clean --force
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Troubleshooting

If you see 404 errors:

1. Ensure all environment variables are set correctly
2. Clear your browser cache and cookies
3. Try accessing the app in an incognito window
4. Verify Clerk dashboard settings match your environment variables

## URL Format Reference

This application uses the following URL format:
- `/signin` (not `/sign-in`)
- `/signup` (not `/sign-up`)