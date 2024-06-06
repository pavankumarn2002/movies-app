import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { prisma} from '@/lib/client'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
interface USER{
  id:String,
  email:String,
  password:String
}
export async function POST(req:Request) {
  if (req.method !== 'POST') {
    //return res.status(405).json({ message: 'Method not allowed' });
    return NextResponse.json({ message: 'Method not allowed' },{status:405})
  }

  const { email, password } =await req.json();
  if (!email || !password) {
    //return res.status(400).json({ message: 'Email and password are required' });
    return NextResponse.json({ message: 'Email and password are required' },{status:400})
  }

  // try {
    const user = await prisma.user.findUnique({ where: { email } }) as USER;
    console.log('user',user);
    

    if (!user) {
      //return res.status(404).json({ message: 'User not found' });
      return NextResponse.json({ message: 'User not found' },{status:404})

    }

    const isPasswordValid = await bcrypt.compare(password.toString(), user.password.toString());

    if (!isPasswordValid) {
     // return res.status(401).json({ message: 'Invalid password' });
      return NextResponse.json({ message: 'Invalid password' },{status:401})
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    //return res.status(200).json({ message: 'Sign in successful', token });
      return NextResponse.json({ message: 'Sign in successful' },{status:200})
  // } catch (error) {
    //return res.status(500).json({ message: 'Sign in failed', error });
    // return NextResponse.json({ message: 'Sign in failed' ,error},{status:500})
  // }
}