import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/client";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
interface USER {
    id: String;
    email: String;
    password: String;
}
export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    try {
        const user = (await prisma.user.findUnique({ where: { email } })) as USER;

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password.toString(), user.password.toString());

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        const payload = {
            email: user.email,
            token: token,
        };
        cookies().set("token",token)
        return NextResponse.json({ message: "Sign in successful", payload }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Sign in failed", error }, { status: 500 });
    }
}
