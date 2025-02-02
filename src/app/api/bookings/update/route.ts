import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../Lib/db";
import BookingModel from "../../../../../Lib/Models/Booking";

export async function PUT(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse request body
    const { bookingId, status } = await req.json();

    // Validate request data
    if (!bookingId || !["accepted", "declined"].includes(status)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Find and update booking
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    // If booking not found
    if (!updatedBooking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking updated successfully", booking: updatedBooking }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error updating booking", error: error.message }, { status: 500 });
  }
}
