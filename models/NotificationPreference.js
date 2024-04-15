const mongoose = require("mongoose");

// Define address schema
const notificationPreferenceSchema = new mongoose.Schema({
  typeNotification: { type: String, default: "Email" },
  newsletterNotification: { type: Boolean, default: true },
  pushNotification: { type: Boolean, default: true },
});

// Define model
module.exports = mongoose.model(
  "NotificationPreference",
  notificationPreferenceSchema
);
