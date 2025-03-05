import { NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import Clinic from "../../../../Lib/Models/Addclinic";
import User from "../../../../Lib/Models/user";

// Define interfaces for Clinic and User
interface Clinic {
  _id: string;
  clinicName: string;
  location: string;
}

interface User {
  clinicId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export async function GET() {
  await dbConnect();

  try {
    // ✅ Explicitly define the type for clinics and clinicAdmins
    const clinics = await Clinic.find().lean<Clinic[]>();
    const clinicAdmins = await User.find({ role: "clinicadmin" }).lean<User[]>();

    // ✅ Ensure TypeScript correctly understands the data structure
    const clinicData = clinics.map((clinic) => {
      const admin = clinicAdmins.find(admin => admin.clinicId?.toString() === clinic._id.toString());

      return {
        clinicId: clinic._id.toString(), // ✅ Ensure `_id` is converted to a string
        clinicName: clinic.clinicName,
        location: clinic.location,
        admin: admin ? {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          phoneNumber: admin.phoneNumber
        } : null
      };
    });

    return NextResponse.json(clinicData, { status: 200 });
  } catch (error) {
    console.error("Error fetching clinics:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}