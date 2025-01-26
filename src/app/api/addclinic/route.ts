import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import Clinic from "../../../../Lib/Models/Addclinic";

export async function POST(req: NextRequest) {
  try {
    const { clinicName, location } = await req.json();

    if (!clinicName || !location) {
      return NextResponse.json(
        { message: "Clinic name and location are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingClinic = await Clinic.findOne({ clinicName });
    if (existingClinic) {
      return NextResponse.json(
        { message: "Clinic name already exists." },
        { status: 400 }
      );
    }

    const newClinic = new Clinic({ clinicName, location });
    await newClinic.save();

    return NextResponse.json(
      { message: "Clinic added successfully!", clinic: newClinic },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding clinic:", error);
    return NextResponse.json(
      { message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}
