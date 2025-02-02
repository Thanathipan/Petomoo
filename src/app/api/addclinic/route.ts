import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import Clinic from "../../../../Lib/Models/Addclinic";
import User from "../../../../Lib/Models/user";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { clinicName, location, firstName, lastName, email, phoneNumber, password } = await req.json();

    // Check if email or phone number already exists
    if (await User.findOne({ email })) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }
    if (await User.findOne({ phoneNumber })) {
      return NextResponse.json({ message: "Phone number already exists" }, { status: 400 });
    }

    // Create Clinic
    const clinic = new Clinic({ clinicName, location });
    await clinic.save();

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Clinic Admin
    const clinicAdmin = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      role: "clinicadmin",
      password: hashedPassword,
      clinicId: clinic._id, // Link clinic admin to the newly created clinic
    });

    await clinicAdmin.save();

    return NextResponse.json({ message: "Clinic and Clinic Admin added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error adding clinic:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
