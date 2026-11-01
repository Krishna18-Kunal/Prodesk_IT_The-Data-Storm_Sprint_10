require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const logger = require("./middleware/logger");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(logger);

// Health check and API information
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sprint 10 Data Hub API is running!",
    database: mongoose.connection.readyState === 1
      ? "connected"
      : "not connected",
    endpoints: {
      getAllPosts: "GET /posts",
      getPostById: "GET /posts/:id",
      createPost: "POST /posts",
      updatePost: "PUT /posts/:id",
      deletePost: "DELETE /posts/:id",
      topThreeRecentPosts: "GET /posts/recent/top",
      createUser: "POST /users",
      getUsers: "GET /users",
      login: "POST /login"
    }
  });
});

// API routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/login", authRouter);

// Unknown route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("API Error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: err.message
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid data format"
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with this value already exists"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Atlas connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Blog API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();