"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect_url") || 
                   searchParams.get("return_to") || 
                   searchParams.get("redirect") || 
                   "/notes";

  // Clean and format the redirect URL
  const cleanRedirectUrl = redirectPath
    .replace('/sign-in', '/signin')
    .replace('/sign-up', '/signup')
    // Remove any duplicate slashes
    .replace(/\/+/g, '/')
    // Ensure it starts with a slash
    .replace(/^(?!\/)/, '/');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp 
        afterSignUpUrl={cleanRedirectUrl}
        redirectUrl={cleanRedirectUrl}
      />
    </div>
  );
}