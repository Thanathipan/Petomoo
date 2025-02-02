import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import Clinic from "../../../../Lib/Models/Addclinic";
import User from "../../../../Lib/Models/user";

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { clinicId } = await req.json();

    // Find and delete the clinic
    const deletedClinic = await Clinic.findByIdAndDelete(clinicId);

    if (!deletedClinic) {
      return NextResponse.json({ message: "Clinic not found" }, { status: 404 });
    }

    // Delete associated clinic admin
    await User.deleteOne({ clinicId });

    return NextResponse.json({ message: "Clinic and Admin deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting clinic:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
