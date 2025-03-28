import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const cookie = req.cookies.get("session-id");

  if (!cookie) {
    res.cookies.set("session-id", crypto.randomUUID());
  }

  return res;
}
