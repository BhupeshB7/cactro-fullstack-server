import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
     await  mongoose.connect(process.env.MONGO_URI);

    console.log(" MongoDB Connected");
    const gracefulExit = async (signal) => {
      console.log(`Received ${signal}. Closing MongoDB connection...`);
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    };

    process.on("SIGINT", () => gracefulExit("SIGINT"));
    process.on("SIGTERM", () => gracefulExit("SIGTERM"));
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
