import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Database connected");
    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("Database disconnected");
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
