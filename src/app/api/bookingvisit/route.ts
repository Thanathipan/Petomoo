import { NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import BookingVisit from "../../../../Lib/Models/Bookingvisit";

export async function POST(req: Request) {
  try {
    // Establish a database connection
    await dbConnect();

    // Parse the request body
    const body = await req.json();

    const {
      firstName,
      lastName,
      mobile,
      email,
      address,
      petName,
      type,
      breed,
      age,
      illnessPeriod,
      problem,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !mobile || !email || !petName || !type || !problem) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Create a new booking record in the database
    const booking = await BookingVisit.create({
      firstName,
      lastName,
      mobile,
      email,
      address,
      petName,
      type,
      breed,
      age,
      illnessPeriod,
      problem,
    });

    // Respond with a success message
    return NextResponse.json(
      { message: "Booking created successfully!", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);

    // Handle any server errors
    return NextResponse.json(
      { error: "Failed to create booking. Please try again later." },
      { status: 500 }
    );
  }
}
