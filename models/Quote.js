const mongoose = require("mongoose");
// Define quote schema
const serviceSchema = new mongoose.Schema({
  description: { type: String },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  taxCode: { type: String },
  amount: { type: Number },
});
const attachments = new mongoose.Schema({
  fileUrl: { type: String },
});
const quoteSchema = new mongoose.Schema(
  {
    quoteNo: { type: String, unique: true, required: true },
    purchaseOrderNo: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, required: true },
    amountWithTax: { type: String, required: true, default: false },
    notes: { type: String, required: false },
    // itemId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Item",
    // },
    service: serviceSchema,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  },
  { timestamps: true }
);

//add acount type link with this
// Define model
module.exports = mongoose.model("Quote", quoteSchema);
