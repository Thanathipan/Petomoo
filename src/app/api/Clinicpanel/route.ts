import {  NextResponse } from "next/server";
import dbConnect from "./../../../../Lib/db"; // MongoDB connection utility
import Clinic from "./../../../../Lib/Models/Addclinic"; // Clinic model

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all clinics
    const clinics = await Clinic.find();

    // Return the clinics as JSON
    return NextResponse.json(clinics);
  } catch (error) {
    console.error("Error fetching clinics:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching clinics." },
      { status: 500 }
    );
  }
}
