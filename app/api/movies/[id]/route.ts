
import { NextResponse } from 'next/server';
import { prisma} from '@/lib/client'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
    });
    if (movie) {
      return NextResponse.json(movie, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching movie' }, { status: 500 });
  }
}