import { NextResponse } from "next/server";
import { prisma } from "@/lib/client";
import { cookies } from "next/headers";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(request: Request) {
    const { title, director, releaseDate, genre,image } = await request.json();
    const { userId } = (await jwt.verify(cookies().get("token")?.value as string, process.env.JWT_SECRET as Secret)) as { userId: string };
    console.log(userId);
    try {
        const newMovie = await prisma.cart.create({
            data: { title, director, releaseDate: new Date(releaseDate), genre,image, userId },
        });
        return NextResponse.json(newMovie, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error creating cart" }, { status: 500 });
    }
}
