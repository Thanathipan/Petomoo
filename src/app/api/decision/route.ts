import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Booking from "../../../../Lib/Models/Booking"; // Ensure the correct path
import dbConnect from "../../../../Lib/db"; // Your database connection file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Connect to MongoDB

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { bookingId, status } = req.body;

    // Validate the booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    // Validate the status value
    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Booking already processed" });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    res.status(200).json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error while updating booking" });
  }
}
