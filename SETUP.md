# Getting Started with Your Collaborative Note Taking App

## Prerequisites
- Node.js 16+ installed
- PostgreSQL database (Neon)
- Clerk account for authentication

## Environment Setup
1. Create a `.env` file in the root directory with:
```env
# Database
DATABASE_URL="your-neon-db-url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

## Installation Steps
1. Install dependencies:
```bash
npm install
```

2. Run database migrations:
```bash
npx prisma generate
npx prisma db push
```

3. Start the WebSocket server (in a separate terminal):
```bash
node server.ts
```

4. Start the Next.js development server:
```bash
npm run dev
```

## Features Available
- Real-time collaborative editing
- User presence indicators (online/offline)
- Automatic saving every 5 seconds
- Note organization with categories
- Share notes with other users
- Authentication and authorization

## Usage
1. Sign in using Clerk authentication
2. Create a new note from the dashboard
3. Share notes with collaborators using their email
4. Edit notes collaboratively in real-time
5. Organize notes using categories

## Troubleshooting
- If real-time updates aren't working, ensure the WebSocket server is running
- Check that all environment variables are set correctly
- Verify database connection using `npx prisma studio`