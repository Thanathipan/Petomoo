import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import userModel from "../../../../Lib/Models/user";

// Get all users (Super Admin only)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const users = await userModel.find({}, "-password"); // Exclude passwords
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}

// Delete a user (Super Admin only)
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}

// Update user details (Super Admin only)
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, firstName, lastName, role } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}
