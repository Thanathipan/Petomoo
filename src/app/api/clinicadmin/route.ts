import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import User from "../../../../Lib/Models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  password?: string;
  clinicId?: mongoose.Types.ObjectId;



}

// ✅ GET Clinic Admin by ID
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Clinic Admin ID" }, { status: 400 });
    }

    const admin = await User.findById(id)
      .populate("clinicId", "clinicName location")
      .select("-password"); // 🔒 Exclude password

    if (!admin) {
      return NextResponse.json({ message: "Clinic Admin not found" }, { status: 404 });
    }

    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    console.error("❌ Error in GET Clinic Admin:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ✅ UPDATE Clinic Admin Profile
export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { id, firstName, lastName, email, phoneNumber, password, clinicId } = body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Clinic Admin ID" }, { status: 400 });
    }

    // ✅ Prepare Update Data
    const updateData: UserData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (clinicId && mongoose.Types.ObjectId.isValid(clinicId)) updateData.clinicId = clinicId;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedAdmin = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

    if (!updatedAdmin) {
      return NextResponse.json({ message: "Clinic Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully!", updatedAdmin }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in PUT Clinic Admin:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
