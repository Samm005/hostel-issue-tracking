const mongoose = require("mongoose");

/* USER */
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "management"],
    required: true
  }
});

/* ISSUE */
const IssueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: String,
    status: {
      type: String,
      default: "Reported"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

/* LOST & FOUND */
const LostFoundSchema = new mongoose.Schema(
  {
    itemName: String,
    description: String,
    location: String,
    status: {
      type: String,
      default: "Lost"
    }
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", UserSchema),
  Issue: mongoose.model("Issue", IssueSchema),
  LostFound: mongoose.model("LostFound", LostFoundSchema)
};
