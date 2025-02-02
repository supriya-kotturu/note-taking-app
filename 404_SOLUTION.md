# Immediate Fix for 404 Error

If you're getting the 404 error when redirecting to /sign-in, follow these steps in order:

1. **First: Stop and Clean**
   ```bash
   # Stop your server (Ctrl+C)
   rm -rf .next
   rm -rf app/sign-in
   rm -rf app/sign-up
   ```

2. **Then: Verify Environment**
   ```bash
   # Open .env.local and ensure these EXACT values:
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   ```

3. **Restart Clean**
   ```bash
   npm run dev
   ```

4. **Test With These Exact Steps**
   1. Open a new incognito window
   2. Go directly to http://localhost:3000/signin
   3. This should show the login page

If this doesn't work immediately:

1. **Double-Check URLs**
   - Make sure you're using `/signin` (no hyphen)
   - Do NOT use `/sign-in` (with hyphen)

2. **Clear ALL Cache**
   ```bash
   npm cache clean --force
   rm -rf .next
   ```

3. **Check Clerk Dashboard**
   - URL settings should use `/signin`
   - NOT `/sign-in`

Still having issues? Check your browser console for error messages and refer to TROUBLESHOOTING_AUTH.md for more detailed steps.