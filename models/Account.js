const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  bsb: {
    type: String,
  },
  bankAccountNo: {
    type: String,
  },
  bankAccountName: {
    type: String,
  },
  companyTradingName: {
    type: String,
  },
});

// Define subscription plan schema
const accountSchema = new mongoose.Schema(
  {
    classification:{
      type:String,
      required: true,
    },
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
    classifyCashflow: {
      type: String,
    },
    inactiveAccount: {
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
