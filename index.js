import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import logger from "./middleware/logger.js";
import allRoutes from "./routes/index.js"; 
const app = express();

// Middleware
app.use(
  cors({
    origin:[ "http://localhost:5173","https://cactro-fullstack-test.netlify.app"],
  })
); 
app.use(express.json());
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.send("Cactro API Server is running.");
});
app.use("/api", allRoutes);
//global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  }); 
});

// Connect to DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
