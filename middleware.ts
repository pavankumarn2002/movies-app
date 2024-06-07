import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log(request.cookies.get("token"));
    if (request.cookies.has("token")) {
        return NextResponse.next();
    } else {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ["/", "/home","/movies/:path*"],
};
