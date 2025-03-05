import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../Lib/db";
import User from "../../../../../Lib/Models/user";

export const GET = async (req: NextRequest) => {
    try {
      await connectToDatabase();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { message: "Failed to fetch user.", error},
        { status: 500 }
      );
    }
  };