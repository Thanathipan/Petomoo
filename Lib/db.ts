import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
const dbConnect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("MongoDB is already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("MongoDB connection is in progress");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: 'petomoo',
      bufferCommands: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.log("MongoDB connection error:", error.message);
    throw new Error("MongoDB connection failed");
  }
};
export default dbConnect; 