import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export async function middleware(request) {
  let locales = ["en", "es"];
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  // Check if pathname is for fonts, in this case dont apply changes
  if (pathname.includes("Gotham-Font")) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  let actualHeaders = headers();
  let langsHeaders = actualHeaders.get("accept-language");
  let langs = new Negotiator({
    headers: { "accept-language": langsHeaders },
  }).languages();

  let defaultLocale = "en";

  const locale = match(langs, locales, defaultLocale);
  // Redirect if there is no locale
  request.nextUrl.pathname = `${
    locale
      ? `/${locale}/${pathname}${
          locale === "es" &&
          !pathname.includes("webinars") &&
          !pathname.includes("news") &&
          pathname !== "/"
            ? "-es"
            : ""
        }`
      : `/en/${
          pathname.includes("-es") ? pathname.replace("-es", "") : pathname
        }`
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
