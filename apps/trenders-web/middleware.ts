import { NextRequest, NextResponse } from "next/server";
import { LOCALES, resolveLocale } from "./config/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (hasLocale) {
    const response = NextResponse.next();
    return response;
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = resolveLocale(cookieLocale);
const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};