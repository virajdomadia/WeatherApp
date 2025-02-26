const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get User Preferences
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update User Preferences
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { preferredUnit } = req.body;
  try {
    let user = await User.findOneAndUpdate(
      { userId },
      { preferredUnit },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
