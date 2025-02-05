import { NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db"; // Ensure DB connection
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../../Lib/Models/user"; // Import User model

const JWT_SECRET = process.env.JWT_SECRET; // Define JWT_SECRET

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

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Logged in successful", token, user: { email: user.email, role: user.role }  }, { status: 200 });

    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15552000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error, please try again later" }, { status: 500 });
  }
}

