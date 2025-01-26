import mongoose, { Schema, Document } from "mongoose";

export interface IClinic extends Document {
  clinicName: string;
  location: string;
}

const ClinicSchema: Schema = new Schema({
  clinicName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
});

export default mongoose.models.Clinic || mongoose.model<IClinic>("Clinic", ClinicSchema);
