const mongoose = require("mongoose");

// Define address schema
const addressSchema = new mongoose.Schema(
  {
    addressLine1: { type: String, required: true },
    addressLine2: String,
    suburb: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: {
      type: String,
      default: "Australia",
    },
  }
 ); 

// Define model
module.exports = mongoose.model("Address", addressSchema);
