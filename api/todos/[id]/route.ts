import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const { completed, title } = await req.json();

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...(typeof completed === "boolean" ? { completed } : {}),
        ...(typeof title === "string" ? { title } : {}),
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating todo", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    await prisma.todo.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error deleting todo", { status: 500 });
  }
}
