const mongoose = require("mongoose");

// Define contact schema
const contactSchema = new mongoose.Schema({
  contactId: { type: String, unique: true },
  contactType: { type: String, required: true },
  isActive: { type: Boolean, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String },
  designation: { type: String, required: false },
  mobileNo: { type: String, required: false },
  phoneNo: { type: String, required: false },
  abn: { type: String, required: false },
  websiteURl: { type: String, required: false },
  companyName: { type: String, required: false },
  notes: { type: String, required: false },
});

//add acount type link with this
// Define model
module.exports = mongoose.model("Contact", contactSchema);
