import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createNote } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function NewNotePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const categories = await prisma.category.findMany({
    where: { userId },
  });

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Create New Note</h1>
      <form action={createNote} className="space-y-8 max-w-lg">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            name="title"
            placeholder="Enter note title"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category (optional)
          </label>
          <select
            id="category"
            name="category"
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">Create Note</Button>
      </form>
    </div>
  );
}