 
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    // Redirect unauthenticated users to signin
    return redirect('/signin');
  }

  return redirect('/notes');
}