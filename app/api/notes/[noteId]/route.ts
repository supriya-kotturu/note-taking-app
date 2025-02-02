import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, content, categoryId } = await req.json();

    const note = await prisma.note.update({
      where: {
        id: params.noteId,
      },
      data: {
        title,
        content,
        categoryId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("[NOTE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const note = await prisma.note.delete({
      where: {
        id: params.noteId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("[NOTE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}