require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const githubRoutes = require("./src/routes/githubRoutes");
const { verifyApiKey } = require("./src/middleware/authMiddleware");

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
