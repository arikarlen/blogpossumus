import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export async function middleware(request) {
  let locales = ["en", "es"];
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;
  // const actualHeaders = headers();
  // let langs = new Array(actualHeaders.get('accept-language'));
  let actualHeaders = headers();
  let langsHeaders = actualHeaders.get("accept-language");
  let langs = new Negotiator({ headers:{"accept-language":langsHeaders} }).languages();

  let defaultLocale = "en";

  const locale = match(langs, locales, defaultLocale);
  // Redirect if there is no locale
  request.nextUrl.pathname = `${
    locale ? `/${locale}/${pathname}` : `/en/${pathname}`
  }`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
    "/",
  ],
};
