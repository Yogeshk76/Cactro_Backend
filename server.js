import "dotenv/config";
import express from "express";
import cors from "cors";
import githubRoutes from "./src/routes/githubRoutes.js";
import fs from "fs";
import path from "path";
import {marked} from "marked";


const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
const readmePath = path.join(process.cwd(), "README.md");

// Routes
app.use("/github", githubRoutes);

app.get("*", (req, res) => {
  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading README file.");
    }

    const htmlContent = marked.parse(data); // Convert Markdown to HTML

    res.send(`
<html>
            <head>
                <title>README</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
                <style>
                    body {
                        margin: 0;
                        padding: 40px 20px;
                        font-family: 'Inter', sans-serif;
                        background: linear-gradient(135deg, #1A1F3D 0%, #2D334A 100%);
                        color: #F5F7FA;
                        line-height: 1.7;
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    main {
                        max-width: 900px;
                        width: 100%;
                        background: rgba(245, 247, 250, 0.1);
                        backdrop-filter: blur(10px);
                        padding: 40px;
                        border-radius: 16px;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        transition: transform 0.3s ease;
                    }
                    main:hover {
                        transform: translateY(-5px);
                    }
                    h1 {
                        font-size: 2.5em;
                        font-weight: 700;
                        color: #F5F7FA;
                        margin-bottom: 0.8em;
                        border-bottom: 2px solid #5E7CE2;
                        padding-bottom: 0.2em;
                    }
                    h2 {
                        font-size: 1.8em;
                        font-weight: 600;
                        color: #5E7CE2;
                        margin-top: 1.5em;
                    }
                    h3, h4, h5, h6 {
                        font-weight: 600;
                        color: #F5F7FA;
                    }
                    p {
                        font-size: 1.1em;
                        margin: 1em 0;
                    }
                    pre {
                        background: #2D334A;
                        padding: 20px;
                        border-radius: 8px;
                        font-family: 'JetBrains Mono', monospace;
                        color: #F5F7FA;
                        border: 1px solid #5E7CE2;
                        position: relative;
                        overflow-x: auto;
                        transition: border-color 0.3s ease;
                    }
                    pre:hover {
                        border-color: #FFD166;
                    }
                    code {
                        font-size: 0.95em;
                    }
                    a {
                        color: #5E7CE2;
                        text-decoration: none;
                        position: relative;
                        transition: color 0.3s ease;
                    }
                    a:hover {
                        color: #FFD166;
                    }
                    a:after {
                        content: '';
                        position: absolute;
                        width: 0;
                        height: 1px;
                        bottom: -4px;
                        left: 0;
                        background: #FFD166;
                        transition: width 0.3s ease;
                    }
                    a:hover:after {
                        width: 100%;
                    }
                    @media (max-width: 768px) {
                        body {
                            padding: 20px 10px;
                        }
                        main {
                            padding: 25px;
                        }
                        h1 {
                            font-size: 2em;
                        }
                        h2 {
                            font-size: 1.5em;
                        }
                    }
                </style>
            </head>
            <body>
                <main>
                    ${htmlContent}
                </main>
            </body>
            </html>
    `);
  });
});




const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
