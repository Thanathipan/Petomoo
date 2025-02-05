import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import User from "../../../../Lib/Models/user";

// Fetch Super Admin details
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Super Admin ID is required" }, { status: 400 });
    }

    const superAdmin = await User.findById(id).select("-password"); // Exclude password

    if (!superAdmin) {
      return NextResponse.json({ message: "Super Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ user: superAdmin }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch Super Admin details" }, { status: 500 });
  }
}

// Update Super Admin details
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, firstName, lastName, phoneNumber } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Super Admin ID is required" }, { status: 400 });
    }

    const updatedSuperAdmin = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, phoneNumber },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedSuperAdmin) {
      return NextResponse.json({ message: "Super Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully", user: updatedSuperAdmin }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}
