import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token?.exp && Math.floor(Date.now() / 1000) > token?.exp) {
    return new Response("Session Expired", { status: 401 });
  }

  const path = request.nextUrl.pathname;
  const publicPaths = new Set(["/auth/login", "/auth/sign-up"]);
  const isPublicPath = publicPaths.has(path);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/sign-up"],
};
