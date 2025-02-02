import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "user" | "clinicadmin" | "superadmin";
  clinicId?: Schema.Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["user", "clinicadmin", "superadmin"], default: "user" },
    clinicId: { type: Schema.Types.ObjectId, ref: "Clinic", required: function () { return this.role === "clinicadmin"; } }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>("User", userSchema);

export default User;
