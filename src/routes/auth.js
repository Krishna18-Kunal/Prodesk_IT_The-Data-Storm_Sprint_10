const express = require("express");

const router = express.Router();

// POST /login
// Demo-only mock login; not production authentication
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: `mock-jwt-${Date.now()}`,
  });
});

module.exports = router;