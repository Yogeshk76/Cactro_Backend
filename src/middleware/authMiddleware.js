const API_KEY = process.env.API_KEY;

export const verifyApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ error: "Unauthorized: Invalid API Key" });
  }

  next();
};
