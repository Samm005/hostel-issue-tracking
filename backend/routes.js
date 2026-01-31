const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User, Issue, Announcement, LostFound } = require("./models");
const { authMiddleware } = require("./middleware");

/* ---------------- TEST ---------------- */
router.get("/test", (req, res) => {
  res.json({ message: "Routes are working ✅" });
});

/* ---------------- LOGIN ---------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email, password });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

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
    res.status(500).json({ message: err.message });
  }
});

/* ---------------- ISSUES ---------------- */
router.post("/issues", authMiddleware, async (req, res) => {
  const issue = await Issue.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(issue);
});

router.get("/issues", authMiddleware, async (req, res) => {
  const issues = await Issue.find().sort({ createdAt: -1 });
  res.json(issues);
});

router.put("/issues/:id/status", authMiddleware, async (req, res) => {
  const updated = await Issue.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

/* ---------------- ANNOUNCEMENTS ---------------- */
router.get("/announcements", authMiddleware, async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  res.json(announcements);
});

router.post("/announcements", authMiddleware, async (req, res) => {
  if (req.user.role !== "management")
    return res.status(403).json({ message: "Access denied" });

  const announcement = await Announcement.create({
    ...req.body,
    createdBy: req.user.id
  });

  res.json(announcement);
});

/* ---------------- LOST & FOUND ---------------- */

/* Student + Management → view all */
router.get("/lost-found", authMiddleware, async (req, res) => {
  const items = await LostFound.find().sort({ createdAt: -1 });
  res.json(items);
});

/* Student → report lost/found item */
router.post("/lost-found", authMiddleware, async (req, res) => {
  const item = await LostFound.create({
    ...req.body
  });
  res.status(201).json(item);
});

/* Management → update status */
router.put("/lost-found/:id/status", authMiddleware, async (req, res) => {
  if (req.user.role !== "management")
    return res.status(403).json({ message: "Access denied" });

  const updated = await LostFound.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;