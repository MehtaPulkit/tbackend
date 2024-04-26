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
      unique: true,
    },
    accountNo: {
      type: String,
    },
    accountName: {
      type: String,
    },
    taxCode: {
      type: String,
    },
    notes: {
      type: String,
    },
    classification: {
      type: String,
    },
    cashFlow: {
      type: String,
    },
    bank: bankSchema,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
