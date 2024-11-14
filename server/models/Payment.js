// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" }, // "paid" when payment is successful
});

module.exports = mongoose.model("Payment", paymentSchema);
