# How to Fix the 404 Auth Redirect Issue

If you're seeing a 404 error with `/sign-in` redirect, follow these steps:

1. **First, try this quick fix:**
   ```bash
   # Stop your server
   npm run dev -- --turbo
   ```
   This forces Next.js to rebuild all routes.

2. **If that doesn't work:**
   ```bash
   # 1. Stop your server
   # 2. Clean everything
   rm -rf .next
   # 3. Start fresh
   npm run dev
   ```

3. **Still seeing 404?**
   Make sure you:
   1. Use `/signin` (without hyphen) in the URL
   2. Have proper environment variables:
      ```bash
      NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
      NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
      ```
   3. Clear your browser cache for localhost:3000

4. **For Clerk Users:**
   - Update your Clerk application settings:
     1. Go to Clerk Dashboard
     2. Select your application
     3. Go to Path Settings
     4. Update:
        - Sign-in URL: `/signin`
        - Sign-up URL: `/signup`

5. **Using Custom Domain?**
   Make sure your Clerk settings match your domain configuration.

## Common Issues

1. **Wrong URL Format**
   - ❌ `/sign-in`
   - ✅ `/signin`

2. **Cache Problems**
   - Clear browser cache
   - Use incognito window
   - Delete .next folder

3. **Environment Issues**
   - Verify your .env.local file
   - Check Clerk dashboard settings
   - Restart your development server

Need more help? Check the full troubleshooting guide in TROUBLESHOOTING_AUTH.md