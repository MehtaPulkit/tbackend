const mongoose = require("mongoose");
// Define quote schema
const serviceSchema = new mongoose.Schema({
  description: { type: String },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  taxCode: { type: String },
  amount: { type: Number },
});
const attachmentSchema = new mongoose.Schema({
  fileUrl: { type: String },
  filename: String,
  contentType: String,
  size: Number,
});
const quoteSchema = new mongoose.Schema(
  {
    quoteNo: { type: String, unique: true, required: true },
    purchaseOrderNo: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, required: true },
    amountWithTax: {
      type: String,
      required: true,
    },
    notes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    attachments: [attachmentSchema],
    service: serviceSchema,
    freightAmount: {
      type: Number,
    },
    freightTaxCode: { type: String },
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

// Define model
module.exports = mongoose.model("Quote", quoteSchema);
