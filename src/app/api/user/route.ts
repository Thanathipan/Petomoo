import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../Lib/db";
import userModel from "../../../../Lib/Models/user";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Route for user registration
export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, phoneNumber } = await req.json();

  try {
    // Connect to the database
    await dbConnect();

    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // Check if the phone number already exists in the database
    const existingPhoneNumber = await userModel.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return NextResponse.json({ message: "Phone number already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber, // Add the phoneNumber here
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration (1 hour)
    );

    const response =  NextResponse.json(
      { message: "User registered successfully", token },
      { status: 201 }
    )

    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15552000, // 1 hour
      path: "/",
    });


    // Send success response with the token
    return response;
  } catch (error) {
    // Handle errors
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Something went wrong", error: errorMessage },
      { status: 500 }
    );
  }
}

// Route for fetching all users
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all users (excluding password for security)
    const users = await userModel.find({}, "-password"); // Exclude the password field

    // Send response with user data
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Something went wrong", error: errorMessage },
      { status: 500 }
    );
  }
}


