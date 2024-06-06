import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma} from '@/lib/client'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request, res:Response) {
  if (req.method !== 'POST') {
    //return res.status(405).json({ message: 'Method not allowed' });
    return NextResponse.json({ message: 'Method not allowed' },{status:405})
  }

  const { name, email, password } =await req.json();

  if (!email || !password) {
    //return res.status(400).json({ message: 'Email and password are required' });
    return NextResponse.json({ message: 'Email and password are required' },{status:400})
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //return res.status(201).json({ message: 'User created', user });
    return NextResponse.json({ message: 'User created' ,user},{status:201})
  } catch (error) {
   // return res.status(500).json({ message: 'User creation failed', error });
    return NextResponse.json({ message: 'User created' ,error},{status:500})
  }
}