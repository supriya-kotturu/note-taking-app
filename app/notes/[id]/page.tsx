import { Editor } from "@/components/ui/editor";
import { InviteDialog } from "@/components/ui/invite-dialog";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function NotePage({ params }: { params: { id: string } }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const note = await prisma.note.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!note) {
    redirect("/notes");
  }

  // Check if user has access to the note
  const hasAccess = note.authorId === userId || note.collaborators.includes(userId);
  if (!hasAccess) {
    redirect("/notes");
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{note.title}</h1>
        {note.authorId === userId && (
          <InviteDialog noteId={note.id} />
        )}
      </div>
      <Editor
        noteId={note.id}
        initialContent={note.content}
        collaborators={[note.authorId, ...note.collaborators]}
      />
    </div>
  );
}