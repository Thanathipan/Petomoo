import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../Lib/db";
import BookingModel from "../../../../Lib/Models/Booking";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { userId, petInfo, date, time, clinicId } = await req.json();

    if (!userId || !petInfo || !date || !time || !clinicId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newBooking = await BookingModel.create({
      userId,
      petInfo,
      date,
      time,
      clinicId,
    });

    return NextResponse.json({ message: "Booking created successfully", booking: newBooking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error creating booking", error: error.message }, { status: 500 });
  }
}
