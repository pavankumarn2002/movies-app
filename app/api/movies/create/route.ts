import { NextResponse } from 'next/server';
import { prisma} from '@/lib/client'


export async function POST(request: Request) {
  const { title, director, releaseDate, genre } = await request.json();

  try {
    const newMovie = await prisma.movie.create({
      data: { title, director, releaseDate: new Date(releaseDate), genre },
    });
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating movie' }, { status: 500 });
  }
}