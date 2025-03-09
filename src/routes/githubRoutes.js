const express = require("express");
const {
  getGitHubProfile,
  getRepoDetails,
  createIssue,
  githubLimiter,
} = require("../controllers/githubController");
const { verifyApiKey } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply rate limiting and API key verification
router.get("/", verifyApiKey, githubLimiter, getGitHubProfile);
router.get("/:repo", verifyApiKey, githubLimiter, getRepoDetails);
router.post("/:repo/issues", verifyApiKey, githubLimiter, createIssue);

module.exports = router;
