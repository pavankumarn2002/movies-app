import { NextResponse } from 'next/server';
import {prisma} from "@/lib/client"

export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    await prisma.movie.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Movie deleted successfully' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting movie' }, { status: 500 });
  }
}