import mongoose, { Schema, Document } from "mongoose";

// Define the TypeScript interface for the booking document
export interface IBookingVisit extends Document {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  address: string;
  petName: string;
  type: string;
  breed: string;
  age: string;
  illnessPeriod: string;
  problem: string;
  createdAt: Date;
}

// Create the Mongoose schema for the booking document
const BookingVisitSchema: Schema = new Schema<IBookingVisit>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: false },
  petName: { type: String, required: true },
  type: { type: String, enum: ["Dog", "Cat", "Other"], required: true },
  breed: { type: String, required: false },
  age: { type: String, required: false },
  illnessPeriod: { type: String, required: true },
  problem: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model
export default mongoose.models.BookingVisit ||
  mongoose.model<IBookingVisit>("BookingVisit", BookingVisitSchema);

  