import { NextResponse } from 'next/server';
import {prisma} from "@/lib/client"

export async function DELETE(request: Request,{ params }: { params: { id: string }} ) {
  // const { id } = await request.json();

  try {
    await prisma.cart.delete({
      where: { id:params.id },
    });
    return NextResponse.json({ message: 'Movie deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting movie' }, { status: 400 });
  }
}