import mongoose, { Schema, Document } from "mongoose";

// Define the Booking interface
export interface IBooking extends Document {
  clientName: string;
  clinicId: string;
  bookingTime: Date;
  status: "pending" | "accepted" | "declined";
}

// Define the Booking schema
const BookingSchema: Schema = new Schema({
  clientName: { type: String, required: true },
  clinicId: { type: String, required: true },
  bookingTime: { type: Date, required: true },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
});

// Export the model
export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
