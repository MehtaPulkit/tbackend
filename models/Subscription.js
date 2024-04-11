const mongoose = require("mongoose");
// Define subscription plan schema
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // Duration in days, months, etc.
      required: true,
    },
    features: [String], // Array of features included in the subscription plan
    // Add other subscription plan attributes as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
