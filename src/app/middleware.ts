import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if no token
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    const userRole = decoded.role;
    const url = req.nextUrl.clone();

    // Redirect unauthorized users from admin pages
    if (url.pathname.startsWith("/dashboard/superadmin") && userRole !== "superadmin") {
      return NextResponse.redirect(new URL("/dashboard/clinicadmin", req.url));
    }

    if (url.pathname.startsWith("/dashboard/clinicadmin") && userRole !== "clinicadmin") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect unauthorized users
    }

    return NextResponse.next(); // Allow access if role is valid
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if token is invalid
  }
}
