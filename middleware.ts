import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Ensure required environment variables are set
const requiredEnvVars = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY
};

if (!requiredEnvVars.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !requiredEnvVars.CLERK_SECRET_KEY) {
  throw new Error("Missing required Clerk environment variables");
}

// Set Clerk URL configuration
Object.entries({
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/signin',
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/signup',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/notes',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/notes'
}).forEach(([key, value]) => {
  process.env[key] = value;
});

export default authMiddleware({
  beforeAuth: (req) => {
    const url = req.nextUrl;
    const path = url.pathname;

    // Early return for correct URL format
    if (['/signin', '/signup'].includes(path)) {
      return NextResponse.next();
    }
    
    // Simple URL format conversion for sign-in/sign-up paths
    if (path === '/sign-in' || path === '/sign-in/') {
      return NextResponse.redirect(new URL('/signin' + url.search, url.origin));
    }
    if (path === '/sign-up' || path === '/sign-up/') {
      return NextResponse.redirect(new URL('/signup' + url.search, url.origin));
    }

    // Handle subdirectories
    if (path.startsWith('/sign-in/') || path.startsWith('/sign-up/')) {
      const newPath = path
        .replace('/sign-in/', '/signin/')
        .replace('/sign-up/', '/signup/');
      return NextResponse.redirect(new URL(newPath + url.search, url.origin));
    }

    // Update URL parameters if needed
    for (const [key, value] of url.searchParams.entries()) {
      if ((key === 'redirect_url' || key === 'return_to') && value) {
        try {
          const parsed = new URL(value, url.origin);
          if (parsed.pathname.includes('sign-in') || parsed.pathname.includes('sign-up')) {
            const newValue = value
              .replace('/sign-in', '/signin')
              .replace('/sign-up', '/signup');
            if (newValue !== value) {
              url.searchParams.set(key, newValue);
              return NextResponse.redirect(url);
            }
          }
        } catch (e) {
          // Invalid URL in parameter, skip modification
          console.error('Invalid URL in redirect parameter:', e);
        }
      }
    }

    return NextResponse.next();
  },
  // Make both URL formats public to prevent authentication loops
  publicRoutes: [
    "/",
    "/signin",
    "/signup", 
    "/sign-in",
    "/sign-up",
    "/api/webhook",
    new RegExp("/signin/*"),
    new RegExp("/signup/*"),
    new RegExp("/sign-in/*"),
    new RegExp("/sign-up/*")
  ],
  ignoredRoutes: ["/api/webhook"]
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};