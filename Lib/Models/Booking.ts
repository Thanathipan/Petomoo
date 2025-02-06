import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IBooking extends Document {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  address?: string;
  petName: string;
  type: string;
  breed?: string;
  age?: string;
  illnessPeriod: string;
  problem: string;
  selectedDate: string;
  selectedTime: string;
  selectedClinic: string;
  clinicName: string;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    petName: { type: String, required: true },
    type: { type: String, required: true },
    breed: { type: String },
    age: { type: String },
    illnessPeriod: { type: String, required: true },
    problem: { type: String, required: true },
    selectedDate: { type: String, required: true },
    selectedTime: { type: String, required: true },
    selectedClinic: { type: String, required: true },
    clinicName: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt
);

// Check if the model already exists before defining it
const BookingVisit = models.BookingVisit || model<IBooking>("BookingVisit", BookingSchema);
export default BookingVisit;
