import { NextRequest, NextResponse } from "next/server";
import { LOCALES, resolveLocale } from "./config/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );
  if (hasLocale) return NextResponse.next();
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = resolveLocale(cookieLocale);

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
