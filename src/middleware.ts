import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname: path } = req.nextUrl;
  return NextResponse.next();
}

