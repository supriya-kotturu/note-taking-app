# Collaborative Notes

A real-time collaborative note-taking application built with Next.js, shadcn/ui, Clerk, and Socket.IO.

## Features

- User Authentication with Clerk
- Real-time collaborative editing
- Team management and invitations
- Note categorization
- Responsive UI with shadcn/ui components
- Optimistic UI updates

## Tech Stack

- **Frontend**: Next.js, TypeScript, shadcn/ui, TailwindCSS
- **Backend**: Node.js, Express, Socket.IO
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Real-time**: Socket.IO

## Setup Instructions

1. Clone the repository

```bash
git clone <repository-url>
cd collaborative-notes
```

2. Install dependencies for both client and server

```bash
# Install client dependencies
npm install

# Install server dependencies
cd server
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/collaborative_notes"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/notes
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/notes
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

5. Start the development servers

```bash
# Start the client
npm run dev

# Start the server (in a new terminal)
cd server
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

- Email: demo@example.com
- Password: demo123

## Deployment

The application can be deployed using the following services:

- Frontend: Vercel
- Backend: Railway or Heroku
- Database: Railway PostgreSQL or Heroku Postgres

## Environment Setup

1. Frontend (Vercel)
   - Set up all environment variables in the Vercel dashboard
   - Connect your GitHub repository
   - Deploy

2. Backend (Railway)
   - Create a new project
   - Add PostgreSQL addon
   - Set up environment variables
   - Deploy the server directory

## Architecture

The application follows a client-server architecture with real-time capabilities:

1. **Client**: Next.js application handling the UI and user interactions
2. **Server**: Express server managing WebSocket connections and database operations
3. **Database**: PostgreSQL storing user data, notes, and categories

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

MIT