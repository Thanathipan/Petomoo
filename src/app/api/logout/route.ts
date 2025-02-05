import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

    // Remove authentication cookies
    response.headers.set("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0;");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: "Logout failed", details: error.message }, { status: 500 });
  }
};

