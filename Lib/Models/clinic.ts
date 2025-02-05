import mongoose, { Schema, Document } from "mongoose";

interface Clinic extends Document {
  name: string;
  location: string;
  clinicId?: mongoose.Types.ObjectId;
  // Add any other fields you need
}

const clinicSchema = new Schema<Clinic>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  clinicId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Clinic = mongoose.models.Clinic || mongoose.model("Clinic", clinicSchema);

export default Clinic;
