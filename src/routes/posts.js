const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post");

const router = express.Router();

// GET /posts/recent/top
// Return the 3 most recent posts
router.get("/recent/top", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("authorId", "name email");

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

// GET /posts
// Fetch all posts from MongoDB
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "name email");

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

// GET /posts/:id
// Fetch one post
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(id)
      .populate("authorId", "name email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// POST /posts
// Create and persist a post
router.post("/", async (req, res, next) => {
  try {
    const { title, content, author, authorId } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
    };

    if (author !== undefined) {
      if (typeof author !== "string") {
        return res.status(400).json({
          success: false,
          message: "Author must be a string",
        });
      }

      postData.author = author.trim();
    }

    if (authorId !== undefined && authorId !== null && authorId !== "") {
      if (!mongoose.isValidObjectId(authorId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid authorId",
        });
      }

      postData.authorId = authorId;
    }

    const post = await Post.create(postData);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /posts/:id
// Update a post in MongoDB
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author, authorId } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title must be a non-empty string",
        });
      }

      updates.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== "string" || !content.trim()) {
        return res.status(400).json({
          success: false,
          message: "Content must be a non-empty string",
        });
      }

      updates.content = content.trim();
    }

    if (author !== undefined) {
      if (typeof author !== "string") {
        return res.status(400).json({
          success: false,
          message: "Author must be a string",
        });
      }

      updates.author = author.trim();
    }

    if (authorId !== undefined) {
      if (authorId === null || authorId === "") {
        updates.authorId = null;
      } else if (mongoose.isValidObjectId(authorId)) {
        updates.authorId = authorId;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid authorId",
        });
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("authorId", "name email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /posts/:id
// Delete a post from MongoDB
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;