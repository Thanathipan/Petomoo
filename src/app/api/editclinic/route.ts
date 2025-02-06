import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import Clinic from "../../../../Lib/Models/Addclinic";
import User from "../../../../Lib/Models/user"; // Assuming Clinic Admins are stored in User model
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const { clinicId, clinicName, location, adminId, firstName, lastName, email, phoneNumber, password } = await req.json();

    // Ensure clinic exists
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return NextResponse.json({ message: "Clinic not found" }, { status: 404 });
    }

    // Update Clinic details
    clinic.clinicName = clinicName;
    clinic.location = location;
    await clinic.save();

    // Ensure Admin exists
    const admin = await User.findById(adminId);
    if (!admin) {
      return NextResponse.json({ message: "Clinic Admin not found" }, { status: 404 });
    }

    // Update Admin details
    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.email = email;
    admin.phoneNumber = phoneNumber;

    // Update password only if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    await admin.save();

    return NextResponse.json({ message: "Clinic and Admin updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating clinic and admin:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
