import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import Clinic from "../../../../Lib/Models/Addclinic";

export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const { clinicId, clinicName, location } = await req.json();

    const updatedClinic = await Clinic.findByIdAndUpdate(
      clinicId,
      { clinicName, location },
      { new: true }
    );

    if (!updatedClinic) {
      return NextResponse.json({ message: "Clinic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Clinic updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating clinic:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
