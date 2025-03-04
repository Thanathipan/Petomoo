import {  NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import Clinic from "../../../../Lib/Models/Addclinic";
import User from "../../../../Lib/Models/user";

interface Clinic {
  _id: string;
  clinicName: string;
  location: string;
}

interface ClinicAdmin {
  clinicId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export async function GET( ) {
  await dbConnect();

  try {
    // Fetch all clinics with their associated clinic admins
    const clinics = await Clinic.find().lean();
    const clinicAdmins = await User.find({ role: "clinicadmin" }).lean();

    // Combine clinic and clinic admin data
    const clinicData = clinics.map((clinic: any) => {
      const admin = clinicAdmins.find(admin => admin.clinicId?.toString() === clinic._id.toString());
      return {
        clinicId: clinic._id,
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
