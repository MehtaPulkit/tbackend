const mongoose = require("mongoose");
// Define subscription plan schema
const jobSchema = new mongoose.Schema(
  {
    jobNo: {
      type: String,
      required: true,
      unique: true,
    },
    jobName: {
      type: String,
    },
    description: {
      type: String,
    },
    inActive: {
      type: Boolean,
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
