import { NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db"; // Ensure DB connection
import bcrypt from "bcrypt";
import User from "../../../../Lib/Models/user"; // Import User model

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // 🚀 Ensure bcrypt is correctly comparing the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.error("Password mismatch!");
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Login successful", user: { email: user.email, role: user.role } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error, please try again later" }, { status: 500 });
  }
}

