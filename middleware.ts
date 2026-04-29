import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";

const PROTECTED_PATHS = [
  "/scotdejews/dashboard",
  "/scotdejews/contacts",
  "/scotdejews/mailer",
  "/scotdejews/logout",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bescherm alle admin pagina's behalve de login zelf
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, sessionOptions);

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/scotdejews", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/scotdejews/:path*"],
};
