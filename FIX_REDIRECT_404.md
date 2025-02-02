# Fix for Redirect 404 Error

If you're getting a 404 error when being redirected to sign-in, follow these exact steps:

1. **First: Full Clean**
   ```bash
   # Stop everything first!
   rm -rf .next
   rm -rf node_modules
   npm cache clean --force
   ```

2. **Verify Directory Structure**
   ```bash
   # Make sure these exist:
   app/signin/page.tsx    # This is correct
   app/signup/page.tsx    # This is correct
   
   # Make sure these do NOT exist:
   app/sign-in           # Delete if exists
   app/sign-up           # Delete if exists
   ```

3. **Fresh Installation**
   ```bash
   npm install
   ```

4. **Clear Browser Data**
   - Open new incognito/private window
   - Or clear cache:
     1. Open Dev Tools (F12)
     2. Right-click Refresh
     3. Select "Empty Cache and Hard Reload"

5. **Start Fresh**
   ```bash
   npm run dev
   ```

6. **Test the Flow**
   1. Open http://localhost:3000
   2. Should redirect to /signin (not /sign-in)
   3. Sign in page should appear

## Still Having Issues?

1. Check Your URLs:
   - ✅ Use: /signin
   - ❌ Don't use: /sign-in

2. Verify Environment:
   ```bash
   # In .env.local:
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   ```

3. Check Clerk Dashboard:
   - Set Sign In URL to: /signin
   - Set Sign Up URL to: /signup
   - No hyphens in URLs!

Need more help? See TROUBLESHOOTING_AUTH.md for complete instructions.