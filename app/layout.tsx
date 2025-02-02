import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import  "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collaborative Notes",
  description: "A real-time collaborative note-taking application",
};

function checkEnvironmentVariables() {
  const requiredEnvVars = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/signin',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/signup',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/notes',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/notes',
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
      "Please check ENVIRONMENT_SETUP.md for setup instructions."
    );
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  checkEnvironmentVariables();
  
  return (
    <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signInUrl="/signin"
        signUpUrl="/signup"
        afterSignInUrl="/notes"
        afterSignUpUrl="/notes"
        // Force consistent URL format for authentication pages
        routing="path"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none"
          }
        }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} min-h-screen bg-background`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}