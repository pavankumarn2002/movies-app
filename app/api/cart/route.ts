import { NextResponse } from 'next/server';
import { prisma} from '@/lib/client'

export async function GET() {
  try {
    const carts = await prisma.cart.findMany();
    return NextResponse.json(carts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 });
  }
}