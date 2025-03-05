import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../Lib/db";
import User from "../../../../Lib/Models/user";



// Handle GET request (Fetch user details by ID)
export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(id).select("-password"); // Exclude password
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Failed to fetch user.", error },
      { status: 500 }
    );
  }
};


// Handle POST requests (Add a new user)
export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const newUser = await req.json();
    console.log("User to save:", newUser);
    const savedUser = await User.create(newUser);
    return NextResponse.json(
      { message: "User saved successfully", savedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { message: "Failed to save user.", error },
      { status: 500 }
    );
  }
};

// Handle GET requests for a single user (Fetch a user by ID)


// Handle PATCH requests (Update a user)
export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const updateData = await req.json();
    console.log("User to update:", updateData);
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user.", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// Handle DELETE requests (Delete a user)
export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user.", error},
      { status: 500 }
    );
  }
};
// Corrected GET request to fetch a single user
