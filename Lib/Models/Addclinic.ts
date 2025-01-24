import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
  clinicName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  photo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Clinic || mongoose.model("Clinic", clinicSchema);
