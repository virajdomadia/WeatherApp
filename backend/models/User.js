const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  preferredUnit: { type: String, default: "C" }, // C for Celsius, F for Fahrenheit
});

module.exports = mongoose.model("User", userSchema);
