'use server'

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createNote(formData: FormData) {
  const { userId } = auth();
  const title = formData.get('title') as string
  const categoryId = formData.get('category') as string || null

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const note = await prisma.note.create({
    data: {
      title,
      content: '',
      authorId: userId,
      categoryId,
    },
  })

  redirect(`/notes/${note.id}`)
}