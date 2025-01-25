import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import clinicModel from "../../../../Lib/Models/Addclinic";

// Route for adding a clinic
export async function POST(req: NextRequest) {
  let clinicName, location, photo;

  try {
    // Check if Content-Type is application/json
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json({ message: "Content-Type must be application/json" }, { status: 400 });
    }

    // Parse the incoming JSON body
    const body = await req.json();
    ({ clinicName, location, photo } = body);

    // Validate the incoming data
    if (!clinicName || !location || !photo) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Check if the clinic name already exists in the database
    const existingClinic = await clinicModel.findOne({ clinicName });
    if (existingClinic) {
      return NextResponse.json({ message: "Clinic name already exists" }, { status: 400 });
    }

    // Create a new clinic instance
    const newClinic = new clinicModel({
      clinicName,
      location,
      photo, // Assuming photo is a URL or base64 string
    });

    // Save the new clinic to the database
    await newClinic.save();

    // Send success response
    return NextResponse.json(
      { message: "Clinic added successfully", clinic: newClinic },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors gracefully
    console.error("Error:", error);
    
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: "Something went wrong", error: errorMessage }, { status: 500 });
  }
}
