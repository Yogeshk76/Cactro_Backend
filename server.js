import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import githubRoutes from "./src/routes/githubRoutes.js";
import { verifyApiKey } from "./src/middleware/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Apply API Key verification globally (optional)
app.use(verifyApiKey);

// Routes
app.use("/github", githubRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
