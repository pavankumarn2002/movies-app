import { NextResponse } from 'next/server';
import { prisma} from '@/lib/client'
import jwt, { Secret } from "jsonwebtoken";
import { cookies } from 'next/headers';

export async function GET() {
  
  // try {
    const { userId } = (await jwt.verify(cookies().get("token")?.value as string, process.env.JWT_SECRET as Secret)) as { userId: string };
    const carts = await prisma.cart.findMany({
      where:{
        userId:userId
      }
    });
    return NextResponse.json(carts, { status: 200 });
  // } catch (error) {
    // return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 });
  // }
}