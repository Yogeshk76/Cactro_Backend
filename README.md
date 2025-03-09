# Cactro Backend

This is the backend for the Cactro application, which interacts with the GitHub API to fetch user profiles, repositories, and create issues.

## Project Structure

```
.env
package.json
server.js
controllers/
  githubController.js
routes/
  githubRoutes.js
middleware/
  authMiddleware.js
```

## Installation

### Clone the repository:

```sh
git clone <repository-url>
cd cactro_backend
```

### Install dependencies:

```sh
npm install
```

### Create a `.env` file in the root directory and add the following environment variables:

```sh
PORT=5000
API_KEY=yogeshkumar60508
```

## Usage

### Start the server:

```sh
npm start
```

The server will run on the port specified in the `.env` file (default is 5000).

## API Endpoints

### Get GitHub Profile

- **URL:** `/github`
- **Method:** `GET`
- **Description:** Fetches the GitHub profile and repositories of the authenticated user.

### Get GitHub Repository Details

- **URL:** `/github/:repo`
- **Method:** `GET`
- **Description:** Fetches details of a specific repository.
- **URL Parameters:**
  - `repo` - The name of the repository.

### Create GitHub Issue

- **URL:** `/github/:repo/issues`
- **Method:** `POST`
- **Description:** Creates a new issue in the specified repository.
- **URL Parameters:**
  - `repo` - The name of the repository.
- **Headers:**
  - `x-api-key: yogeshkumar60508` (API key for authentication)
- **Request Body:**
  ```json
  {
    "title": "Issue title",
    "body": "Issue description"
  }
  ```

## Rate Limiting

The application uses `express-rate-limit` to limit API requests to **5 requests per minute per IP** to prevent abuse.

---

### Author

**Yogesh Kumar**

For any issues, feel free to open an issue in the repository.

