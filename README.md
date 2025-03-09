
---

# **CACTRO-BACKEND-TEST** 🚀  

A simple Node.js backend that integrates with the GitHub API to fetch profile details, repository information, and create issues.  

## **Features**  
- Fetch GitHub user profile with repository list  
- Get details of a specific repository  
- Create an issue in a repository  
- Rate limiting to prevent excessive API requests  

## **Tech Stack**  
- Node.js  
- Express.js  
- MongoDB  
- GitHub API  

## **API Endpoints**  

### **Get GitHub Profile**  
```http
GET /github
```  

### **Get Repository Details**  
```http
GET /github/:repo
```  

### **Create an Issue**  
```http
POST /github/:repo/issues
```  
**Body:**  
```json
{
  "title": "Issue title",
  "body": "Issue description"
}
```  

## **Setup & Run**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/cactro-backend-test.git
   cd cactro-backend-test
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Create a `.env` file and add:  
   ```env
   PORT=5000
   GITHUB_TOKEN=your_github_access_token
   ```  
4. Start the server:  
   ```bash
   npm start
   ```  

---
