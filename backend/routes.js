const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("./models");

const { authMiddleware } = require("./middleware");

router.get("/test", (req, res) => {
  res.json({ message: "Routes are working ✅" });
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated ✅",
    user: req.user
  });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // find user
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });
  } catch (err) {
  console.error("LOGIN ERROR 👉", err);
  res.status(500).json({ message: err.message });
}
});

module.exports = router;
