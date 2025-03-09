import express from "express";
import {
  getGitHubProfile,
  getRepoDetails,
  createIssue,
  githubLimiter,
} from "../controllers/githubController.js";
import { verifyApiKey } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply rate limiting and API key verification
router.get("/", githubLimiter, getGitHubProfile);
router.get("/:repo", githubLimiter, getRepoDetails);
router.post("/:repo/issues", verifyApiKey, githubLimiter, createIssue);

export default router;
