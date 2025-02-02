# Authentication Troubleshooting

## Quick Fix for 404 Errors

If you're seeing a 404 error when trying to sign in:

1. Try accessing `/signin` instead of `/sign-in`
2. Clear your browser cache and cookies
3. Ensure you're using the latest version of the app

## Required Setup Steps

1. **Environment Variables**
   Create a `.env.local` file with ALL of these variables:
   ```bash
   # Required: Clerk authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   
   # Required: URL configuration
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/notes
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/notes
   ```

2. **Clear Cache and Restart**
   ```bash
   # Stop your development server
   # Delete .next folder
   rm -rf .next
   # Delete node_modules (optional)
   rm -rf node_modules
   # Reinstall dependencies
   npm install
   # Start the server
   npm run dev
   ```

3. **Clear Browser Data**
   - Clear cache and cookies
   - Try in incognito mode
   - Disable browser extensions

1. Create a `.env.local` file in your project root with:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

2. Restart your development server:
```bash
npm run dev
```

## URL Format Changes and Redirects

1. **New URL Format**
   - Use `/signin` instead of `/sign-in`
   - Use `/signup` instead of `/sign-up`

2. **Automatic Redirects**
   - The old URLs will automatically redirect to the new format
   - All redirect parameters are preserved
   - Supports `redirect_url`, `return_to`, and `redirect` parameters

3. **Common Issues & Solutions**
   - If seeing 404 errors, clear browser cache and cookies
   - Try accessing the new URL format directly
   - Check if the URL parameters are properly encoded
   - Restart the Next.js development server

4. **Environment Variables**
   Make sure your `.env.local` file is properly configured:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key
   CLERK_SECRET_KEY=sk_test_your-key
   ```
   Then restart your development server:
   ```bash
   npm run dev
   ```

We've updated our authentication URLs to use:
- `/signin` (instead of `/sign-in`)
- `/signup` (instead of `/sign-up`)

The old formats will automatically redirect to the new ones.

If you're seeing 404 errors or authentication issues:

1. Make sure your environment variables are properly set:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   ```

2. The application uses "/signin" and "/signup" (without hyphens) for authentication routes.
   Old URLs with hyphens ("/sign-in", "/sign-up") will not work.

3. Clear your browser cache and cookies if you're still experiencing issues.

4. Ensure you're using the latest version of the application.

## Common Solutions for Auth Issues

1. **Clear Browser Data and Restart Server**
   ```bash
   # Stop the server
   # Clear Next.js cache
   rm -rf .next
   # Restart the server
   npm run dev
   ```

2. **Check Environment Variables**
   - Ensure your `.env.local` file exists and contains the correct keys
   - Verify the keys match exactly with your Clerk dashboard
   - Restart the server after updating environment variables

3. **Browser Troubleshooting**
   - Try in an incognito/private window
   - Clear site data for localhost
   - Disable browser extensions temporarily

4. **URL Patterns**
   The application now supports both URL formats:
   - Modern format: `/signin` and `/signup`
   - Legacy format: `/sign-in` and `/sign-up` (will redirect)