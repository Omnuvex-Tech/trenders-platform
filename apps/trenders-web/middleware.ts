// import { NextRequest, NextResponse } from "next/server";
// import { LOCALES, resolveLocale } from "./config/locales";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const hasLocale = LOCALES.some(
//     (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
//   );

//   if (hasLocale) {
//     const response = NextResponse.next();
//     return response;
//   }

//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
//   const locale = resolveLocale(cookieLocale);
// const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
//   redirectUrl.search = request.nextUrl.search;

//   return NextResponse.redirect(redirectUrl);
// }

// export const config = {
//   matcher: ["/((?!_next|api|.*\\..*).*)"],
// };



import { NextRequest, NextResponse } from "next/server";
import { LOCALES, resolveLocale } from "./config/locales";

const DEFAULT_LOCALE = resolveLocale(undefined);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const matchedLocale = LOCALES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (matchedLocale === DEFAULT_LOCALE) {
    const rest = pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
    const redirectUrl = new URL(rest, request.url);
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (matchedLocale) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = resolveLocale(cookieLocale);

  if (locale === DEFAULT_LOCALE) {

    const rewriteUrl = new URL(
      `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`,
      request.url
    );
    rewriteUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(rewriteUrl);
  }

  const redirectUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    request.url
  );
  redirectUrl.search = request.nextUrl.search;
  return NextResponse.redirect(redirectUrl, 307);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};