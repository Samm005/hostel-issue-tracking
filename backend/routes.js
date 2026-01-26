const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User, Issue } = require("./models");

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

/* CREATE ISSUE (Student) */
router.post("/issues", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const issue = await Issue.create({
      title,
      description,
      category,
      priority,
      createdBy: req.user.id
    });

    res.status(201).json(issue);
  } catch (err) {
    console.error("ISSUE CREATE ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
});

/* GET ALL ISSUES (Student / Management) */
router.get("/issues", authMiddleware, async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("ISSUE FETCH ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE ISSUE STATUS (MANAGEMENT) */
router.put("/issues/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedIssue);
  } catch (err) {
    console.error("STATUS UPDATE ERROR 👉", err);
    res.status(500).json({ message: "Failed to update status" });
  }
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