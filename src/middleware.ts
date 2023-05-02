import { NextResponse as res } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { readFileSync } from "fs";

export function middleware(req: NextRequest) {
  // const { origin, pathname: path } = req.nextUrl;
  // const authToken = req.cookies.get("auth_token");
  // if (path.startsWith("/login") || path.startsWith("/register")) {
  //   if (authToken) return res.redirect(new URL("/d/presensi", origin));
  //   return;
  // }
  // if (path.startsWith("/api/auth/")) return;
  // if (!authToken) return res.redirect(new URL("/login", origin));
  // const token = jwt.verify(authToken.value, readFileSync("private_key.pem"));
  // * Example for return a response
  //   return res.next({
  //     status: 405,
  //     statusText: "Method not allowed"
  //   });
}

