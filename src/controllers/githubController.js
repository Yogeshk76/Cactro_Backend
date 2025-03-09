const axios = require("axios");
const rateLimit = require("express-rate-limit");

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Axios instance for GitHub API requests
const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

// 🛑 Rate limiter for GitHub API requests (5 requests per minute per IP)
const githubLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Max 5 requests per minute per IP
  message: { error: "Too many requests, please try again later." },
});

// 1️⃣ Get GitHub User Data + Repos
exports.getGitHubProfile = async (req, res) => {
  try {
    // Fetch user data
    const { data: user } = await githubAPI.get("/user");

    // Fetch repositories
    const { data: repos } = await githubAPI.get("/user/repos");

    // Format response
    res.json({
      username: user.login,
      name: user.name,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      avatar_url: user.avatar_url,
      bio: user.bio,
      repos: repos.map(repo => ({
        name: repo.name,
        url: repo.html_url,
      })),
    });
  } catch (error) {
    console.error("❌ GitHub Profile Fetch Error:", error.response?.data || error);
    res.status(500).json({
      error: "Failed to fetch GitHub profile data",
      details: error.response?.data || "Unknown error",
    });
  }
};

// 2️⃣ Get Repository Details
exports.getRepoDetails = async (req, res) => {
  try {
    const { repo } = req.params;

    // Fetch authenticated user's GitHub username
    const { data: user } = await githubAPI.get("/user");
    const username = user.login;

    // Fetch repo details
    const { data } = await githubAPI.get(`/repos/${username}/${repo}`);

    res.json({
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      open_issues: data.open_issues_count,
      language: data.language,
      created_at: data.created_at,
      updated_at: data.updated_at,
      url: data.html_url, // Add repo URL
    });
  } catch (error) {
    console.error("❌ GitHub Repo Fetch Error:", error.response?.data || error);
    res.status(500).json({
      error: "Failed to fetch repository data",
      details: error.response?.data || "Unknown error",
    });
  }
};

// 3️⃣ Create a GitHub Issue
exports.createIssue = async (req, res) => {
  try {
    const { repo } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    // Fetch authenticated user's GitHub username
    const { data: user } = await githubAPI.get("/user");
    const username = user.login;

    // Create an issue in the specified repository
    const { data } = await githubAPI.post(`/repos/${username}/${repo}/issues`, {
      title,
      body,
    });

    res.json({ issue_url: data.html_url, message: "✅ Issue created successfully!" });
  } catch (error) {
    console.error("❌ GitHub Issue Creation Error:", error.response?.data || error);
    res.status(500).json({
      error: "Failed to create issue",
      details: error.response?.data || "Unknown error",
    });
  }
};

// Export rate limiter
exports.githubLimiter = githubLimiter;
