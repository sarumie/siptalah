import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { baseUrl } from "./lib/utils";

export async function middleware(req: NextRequest) {
  const { pathname: path } = req.nextUrl;
  const supabase = createMiddlewareSupabaseClient({
    req,
    res: NextResponse.next()
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (
    (path.startsWith("/api/auth") || path.startsWith("/login")) &&
    !path.startsWith("/api/auth/logout") &&
    !session
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/d/presensi";
    redirectUrl.searchParams.set("redirected_from", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (!session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirected_from", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
}

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

