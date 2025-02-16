import { NextResponse } from "next/server";
import dbConnect from "../../../../../Lib/db";
import Booking from "../../../../../Lib/Models/Booking";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all booking records
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings." }, { status: 500 });
  }
}
