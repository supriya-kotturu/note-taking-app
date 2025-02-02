## Client Component Fix

The following changes were made to resolve the React Server Component error:

1. Added 'use client' directive at the top of editor.tsx to mark it as a Client Component
2. Updated router import from 'next/router' to 'next/navigation' to use the correct Next.js 13+ API

The editor component uses React hooks (useState, useEffect) and browser APIs, so it must be a Client Component. The parent components that use this editor (like the notes pages) can remain as Server Components since they properly delegate client-side functionality to the Editor component.