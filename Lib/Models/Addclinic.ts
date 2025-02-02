import { Schema, model, models, Document } from "mongoose";

interface IClinic extends Document {
  clinicName: string;
  location: string;
}

const clinicSchema = new Schema<IClinic>(
  {
    clinicName: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const Clinic = models.Clinic || model<IClinic>("Clinic", clinicSchema);

export default Clinic;
