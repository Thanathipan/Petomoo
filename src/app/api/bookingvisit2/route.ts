import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import bookingModel from "../../../../Lib/Models/Bookingvisit2";

// Store a new booking
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { date, time, clinicId } = await req.json();

    if (!date || !time || !clinicId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newBooking = new bookingModel({ date, time, clinicId });
    await newBooking.save();

    return NextResponse.json({ message: "Booking successful" }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ message: "Error saving booking", error: error.message }, { status: 500 });
  }
}

// Get all bookings
export async function GET() {
  try {
    await dbConnect();
    const bookings = await bookingModel.find().populate("clinicId");
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: "Error fetching bookings", error: error.message }, { status: 500 });
  }
}
