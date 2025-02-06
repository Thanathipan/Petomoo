import { NextResponse } from "next/server";
import dbConnect from "../../../../../Lib/db";
import BookingVisit from "../../../../../Lib/Models/Booking";


export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { bookingId, status } = await req.json();

    const booking = await BookingVisit.findByIdAndUpdate(bookingId, { status }, { new: true });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking status updated.", booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({ error: "Failed to update booking status." }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required." }, { status: 400 });
    }

    const booking = await BookingVisit.findById(bookingId);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ status: booking.status });
  } catch (error) {
    console.error("Error fetching booking status:", error);
    return NextResponse.json({ error: "Failed to fetch booking status." }, { status: 500 });
  }
}