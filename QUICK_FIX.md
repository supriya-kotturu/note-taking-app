# Quick Fix for 404 Auth Error

If you're seeing a 404 error with `/sign-in`, follow these quick steps:

1. **Stop Everything**
   ```bash
   # Stop your Next.js server (Ctrl+C)
   ```

2. **Delete Problematic Directories**
   ```bash
   # Remove old auth directories if they exist
   rm -rf app/sign-in app/sign-up
   rm -rf .next
   ```

3. **Run This Command**
   ```bash
   npm run dev
   ```

4. **Try These URLs**
   - http://localhost:3000/signin (should work)
   - http://localhost:3000/signup (should work)

Still having issues? Make sure:
1. Your .env.local has the correct Clerk keys
2. You're using the right URL format (/signin not /sign-in)
3. Clear your browser cache for localhost:3000

Need more help? Check TROUBLESHOOTING_AUTH.md for detailed steps.