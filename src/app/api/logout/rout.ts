// src/app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));

  // Zera e expira os cookies do servidor
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
  });
  return response;
}
