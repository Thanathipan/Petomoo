import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../Lib/db";
import BookingVisit1 from "../../../../Lib/Models/Bookingvisit1";
import BookingVisit2 from "../../../../Lib/Models/Bookingvisit2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { bookingId, status, source } = req.body;

    if (!bookingId || !status || !source) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let updatedBooking;
    if (source === "bookingvisit1") {
      updatedBooking = await BookingVisit1.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );
    } else if (source === "bookingvisit2") {
      updatedBooking = await BookingVisit2.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: "Invalid source type" });
    }

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: `Booking ${status} successfully`, booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
}
