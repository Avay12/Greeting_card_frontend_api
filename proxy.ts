import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("user-role")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isAdminPage = pathname.startsWith("/admin");
  const isDashboardPage = pathname.startsWith("/dashboard");

  // SCENARIO 1: Public access (Not logged in)
  if (!token) {
    // If trying to hit protected routes without a token, force login
    if (isAdminPage || isDashboardPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Otherwise, let them view public pages
    return NextResponse.next();
  }

  // SCENARIO 2 & 3: Logged in users

  // Prevent logged-in users from seeing Login/Register pages
  if (isAuthPage) {
    const redirectPath = role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // Role-based Restrictions
  if (isAdminPage && role !== "admin") {
    // Admin route protection: Users cannot enter
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardPage && role !== "user") {
    // Dashboard route protection: Admins cannot enter
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Ensure your matcher covers all relevant paths
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
