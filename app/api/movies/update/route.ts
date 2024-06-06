import { NextResponse } from "next/server";
import { prisma } from "@/lib/client";

export async function PUT(request: Request) {
    const { id, title, director, releaseDate, genre } = await request.json();

    try {
        const updatedMovie = await prisma.movie.update({
            where: { id },
            data: { title, director, releaseDate: new Date(releaseDate), genre },
        });
        return NextResponse.json(updatedMovie, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error updating movie" }, { status: 500 });
    }
}
