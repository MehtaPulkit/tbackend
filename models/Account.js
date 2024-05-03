const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  bsb: {
    type: String,
  },
  bankaccountNo: {
    type: String,
  },
  bankaccountName: {
    type: String,
  },
  companyTradingName: {
    type: String,
  },
});

// Define subscription plan schema
const accountSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      required: true,
    },
    accountCode: {
      type: String,
      required: true,
      unique: true,
    },
    accountName: {
      type: String,
      required: true,
      unique: true,
    },
    taxCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaxCode",
    },
    notes: {
      type: String,
    },
    openingBalance: {
      type: Number,
    },
    classifyCashFlow: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    bankDetails: bankSchema,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
