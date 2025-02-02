# Troubleshooting Guide

If you encounter the "auth is not a function" error:

1. Clear your Next.js cache:
```bash
rm -rf .next
```

2. Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

3. Ensure you have the proper environment variables set in `.env`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
```

4. Make sure you're using Node.js 18.17 or later

5. Try running the development server with a clean cache:
```bash
npm run clean && npm run dev
```