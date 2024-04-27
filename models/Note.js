const mongoose = require("mongoose");
// Define note schema
const noteSchema = new mongoose.Schema(
  {
    noteNo: {
      type: String,
      required: true,
      unique: true,
    },
    noteName: {
      type: String,
      required: true,
    },
    noteText: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
