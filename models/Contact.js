const mongoose = require("mongoose");
//Define contact's address schema
const addressSchema = new mongoose.Schema({
  addressLine1: String,
  addressLine2: String,
  suburb: String,
  state: String,
  postalCode: String,
  country: {
    type: String,
    default: "Australia",
  },
});
// Define contact schema
const contactSchema = new mongoose.Schema(
  {
    contactId: { type: String },
    contactType: { type: String, required: true },
    isActive: { type: Boolean, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String },
    designation: { type: String, required: false },
    mobileNo: { type: String, required: false },
    phoneNo: { type: String, required: false },
    abn: { type: String, required: false },
    websiteURL: { type: String, required: false },
    companyName: { type: String, required: false },
    notes: { type: String, required: false },
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//add acount type link with this
// Define model
module.exports = mongoose.model("Contact", contactSchema);
