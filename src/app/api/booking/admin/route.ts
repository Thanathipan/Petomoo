import { NextResponse } from "next/server";
import dbConnect from "../../../../../Lib/db";
import BookingVisit from "../../../../../Lib/Models/Booking";

export async function GET() {
  try {
    await dbConnect();
    const bookings = await BookingVisit.find({});
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
  }
}