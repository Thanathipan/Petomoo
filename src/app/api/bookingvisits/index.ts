import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../Lib/db";
import BookingVisit1 from "../../../../Lib/Models/Bookingvisit1";
import BookingVisit2 from "../../../../Lib/Models/Bookingvisit2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const bookings1 = await BookingVisit1.find({});
    const bookings2 = await BookingVisit2.find({});

    const combinedBookings = [
      ...bookings1.map((booking) => ({
        ...booking.toObject(),
        source: "bookingvisit1",
      })),
      ...bookings2.map((booking) => ({
        ...booking.toObject(),
        source: "bookingvisit2",
      })),
    ];

    res.status(200).json({ bookings: combinedBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}
