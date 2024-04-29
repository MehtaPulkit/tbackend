const mongoose = require("mongoose");
// Define subscription plan schema
const taxCodeSchema = new mongoose.Schema(
  {
    taxCode: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    taxType: {
      type: String,
    },
    rate: {
      type: Number,
    },
    creditWithholdingAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    payableWithholdingAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    linkedTaxContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    accruedDutyAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    linkedImportAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    taxCollectedAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    taxPaidAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    lctThreshold: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("TaxCode", taxCodeSchema);
