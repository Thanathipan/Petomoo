import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "../../../../Lib/Models/Booking"; // Ensure the correct path
import dbConnect from "../../../../Lib/db"; // Your database connection file

export const PUT = async (req: NextRequest) => {
  await dbConnect(); // Connect to MongoDB

  try {
    const { bookingId, status } = await req.json();

    // Validate the booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return NextResponse.json({ message: "Invalid booking ID" }, { status: 400 });
    }

    // Validate the status value
    if (!["accepted", "declined"].includes(status)) {
      return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    if (booking.status !== "pending") {
      return NextResponse.json({ message: "Booking already processed" }, { status: 400 });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    return NextResponse.json({ message: `Booking ${status} successfully`, booking }, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ message: "Server error while updating booking" }, { status: 500 });
  }
};
