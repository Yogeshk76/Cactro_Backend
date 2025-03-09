import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.API_KEY;

export const verifyApiKey = (req, res, next) => {
  console.log("🔹 Server API Key:", API_KEY || "Not Found");

  if (!API_KEY) {
    return res.status(500).json({ error: "Server Error: API Key is missing" });
  }

  if (!req.header("x-api-key") || req.header("x-api-key") !== API_KEY) {
    return res.status(403).json({ error: "Unauthorized: Invalid API Key" });
  }

  next();
};
