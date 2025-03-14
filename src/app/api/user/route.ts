import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../Lib/db";
import userModel from "../../../../Lib/Models/user";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Route for user registration
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, phoneNumber } = await req.json();

    await dbConnect();

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // Check if phone number already exists
    const existingPhoneNumber = await userModel.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return NextResponse.json({ message: "Phone number already exists" }, { status: 400 });
    }

    const role = "user";

    // Create new user
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "User registered successfully", token },
      { status: 201 }
    );

    // Set auth token as HTTP-only cookie
    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15552000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in user registration:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Something went wrong", error: errorMessage }, { status: 500 });
  }
}

// Route for fetching all users
export async function GET() {
  try {
    await dbConnect();
    const users = await userModel.find({}, "-password"); // Exclude password field
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Something went wrong", error: errorMessage }, { status: 500 });
  }
}

// Route for updating user details
export async function PUT(req: NextRequest) {
  try {
    const { id, firstName, lastName, phoneNumber } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await dbConnect();

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Something went wrong", error: errorMessage }, { status: 500 });
  }
}

// Route for deleting a user
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await dbConnect();

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Something went wrong", error: errorMessage }, { status: 500 });
  }
}
