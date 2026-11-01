# Prodesk IT – Sprint 10

## About Project

This project is a RESTful Blog API developed using Node.js, Express.js, MongoDB, and Mongoose.

It allows users to create, view, update, and delete blog posts. It also provides basic user management and a demo login endpoint.

## Features

- Create new blog posts.
- View all blog posts.
- View recent blog posts.
- Update existing posts.
- Delete blog posts.
- Create and view users.
- Demo login endpoint.
- Request logging and error handling.
- MongoDB database integration.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- dotenv

## Project Structure

```text
sprint10-blog-api/
│
├── src/
│   ├── middleware/
│   │   └── logger.js
│   │
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── users.js
│   │
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── PROMPTS.md
```

## Installation

1. Clone the repository.

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```cmd
copy .env.example .env
```

4. Configure your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Endpoints

### General

| Method | Endpoint | Description |
|---|---|---|
| GET | / | API status |

### Posts

| Method | Endpoint | Description |
|---|---|---|
| GET | /posts | Get all posts |
| GET | /posts/recent/top | Get 3 recent posts |
| GET | /posts/:id | Get post by ID |
| POST | /posts | Create a post |
| PUT | /posts/:id | Update a post |
| DELETE | /posts/:id | Delete a post |

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | /users | Create a user |
| GET | /users | Get all users |

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /login | Demo login |


## Error Handling

The API handles common errors such as:

- Invalid input.
- Missing required fields.
- Invalid MongoDB IDs.
- Duplicate email addresses.
- Resource not found.
- Server errors.

## Important Note

The current login endpoint is for demonstration purposes only. It does not provide production-level authentication or password verification.

## Future Improvements

- Secure user authentication.
- JWT-based authorization.
- Automated API testing.
- API documentation.
- Post pagination and search.

## Author

Krishna Kunal

Prodesk IT – Sprint 10
