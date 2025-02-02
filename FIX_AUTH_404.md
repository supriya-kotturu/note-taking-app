# How to Fix 404 Authentication Errors

If you're seeing a 404 error when accessing `/sign-in`, follow these steps in order:

1. **Stop Your Server**
   ```bash
   # Press Ctrl+C to stop your Next.js server
   ```

2. **Clear Next.js Cache**
   ```bash
   rm -rf .next
   ```

3. **Update Environment Variables**
   Create or update your `.env.local` file with:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
   CLERK_SECRET_KEY=your_key_here
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/notes
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/notes
   ```

4. **Clear Browser Cache**
   - Open your browser's settings
   - Clear browsing data for localhost:3000
   - Or use an incognito window for testing

5. **Restart Development Server**
   ```bash
   npm run dev
   ```

6. **Access Correct URLs**
   - Use `/signin` instead of `/sign-in`
   - Use `/signup` instead of `/sign-up`

7. **Still Not Working?**
   - Ensure you're using the correct Clerk API keys
   - Check your Clerk dashboard settings
   - Try completely removing node_modules and reinstalling:
     ```bash
     rm -rf node_modules
     rm -rf .next
     npm install
     npm run dev
     ```