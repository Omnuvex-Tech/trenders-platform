// import { NextRequest, NextResponse } from "next/server";
// import { LOCALES, resolveLocale } from "./config/locales";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const hasLocale = LOCALES.some(
//     (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
//   );
//   if (hasLocale) return NextResponse.next();
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
//   const locale = resolveLocale(cookieLocale);

//   return NextResponse.redirect(
//     new URL(`/${locale}${pathname}`, request.url)
//   );
// }

// export const config = {
//   matcher: ["/((?!_next|api|.*\\..*).*)"],
// };



import { NextRequest, NextResponse } from "next/server";
import { LOCALES, resolveLocale } from "./config/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (hasLocale) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
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

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};