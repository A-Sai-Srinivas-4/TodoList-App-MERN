import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create express app
app.use(cors()); // to handle cross-origin requests
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL as string) // Connect to MongoDB
  .then(() => console.log("Connected to MongoDB")) // Log success
  .catch((err) => console.error("Error connecting to MongoDB:", err)); // Log error

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/todos", todoRoutes); // Use todo routes

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
