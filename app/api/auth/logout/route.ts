import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){
    try {
        cookies().delete('token')
        return NextResponse.json({status:200})
    } catch (error) {
        
    }
}