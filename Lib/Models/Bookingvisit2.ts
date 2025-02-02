import { Schema, model, models, Document } from "mongoose";

interface IBooking extends Document {
  date: string;
  time: string;
  clinicId: string;
  status: "pending" | "accepted" | "declined"; // New field added
}

const bookingSchema = new Schema<IBooking>(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    clinicId: { type: Schema.Types.String, ref: "Clinic", required: true },
    status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" }, // Default is pending
  },
  { timestamps: true }
);

const bookingModel = models.Booking || model<IBooking>("Booking", bookingSchema);

export default bookingModel;
