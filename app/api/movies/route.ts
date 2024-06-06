import { NextResponse } from 'next/server';
import { prisma} from '@/lib/client'

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 });
  }
}