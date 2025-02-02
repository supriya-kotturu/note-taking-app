# Authentication Fixes for 404 Errors

If you're seeing a 404 error with `/sign-in` redirects, follow these steps in order:

1. **Delete Old Auth Directories**
   ```bash
   # Remove old auth directories if they exist
   rm -rf app/sign-in
   rm -rf app/sign-up
   ```

2. **Clear All Caches**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   # Clear npm cache
   npm cache clean --force
   ```

3. **Update Environment Variables**
   Edit `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/notes
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/notes
   ```

4. **Reinstall and Restart**
   ```bash
   npm install
   npm run dev
   ```

5. **Clear Browser Data**
   - Clear cache and cookies for localhost:3000
   - Try in an incognito/private window
   - Disable browser extensions

6. **Access Using New URLs**
   - Use `/signin` (no hyphen)
   - Use `/signup` (no hyphen)

7. **Verify Clerk Dashboard**
   - Check that your app's URLs are configured correctly
   - Ensure your API keys are valid
   - Verify your app's domain settings

8. **Still Having Issues?**
   Try these additional steps:
   ```bash
   # Remove all generated files and dependencies
   rm -rf .next
   rm -rf node_modules
   # Clear npm cache
   npm cache clean --force
   # Reinstall everything
   npm install
   # Start fresh
   npm run dev
   ```