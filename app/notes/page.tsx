import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const notes = await prisma.note.findMany({
    where: {
      OR: [
        { authorId: userId },
        { collaborators: { has: userId } },
      ],
    },
    include: {
      category: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Notes</h1>
        <Button asChild>
          <Link href="/notes/new">Create New Note</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="block p-6 rounded-lg border hover:border-primary transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-muted-foreground mb-4">
              {note.content.substring(0, 100)}...
            </p>
            {note.category && (
              <span className="inline-block px-2 py-1 text-sm rounded-full bg-secondary">
                {note.category.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}