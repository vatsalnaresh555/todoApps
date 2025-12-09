import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error fetching todos", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title || typeof title !== "string") {
      return new NextResponse("Invalid title", { status: 400 });
    }

    const todo = await prisma.todo.create({
      data: { title },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating todo", { status: 500 });
  }
}
