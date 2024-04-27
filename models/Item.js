const mongoose = require("mongoose");
// Define item schema
const itemSchema = new mongoose.Schema(
  {
    itemId: { type: String },
    itemType: { type: String, required: true },
    itemName: { type: String },
    useItemDesc: { type: String },
    isitemActive: { type: Boolean },
    itemDescription: { type: String },

    isItemTracked: { type: Boolean },
    assetAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    isItemSold: { type: Boolean },
    sellingPrice: { type: Number },
    sellingPriceWithTax: { type: String },
    sellingUnit: { type: String },
    incomeAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    incomeTaxCode: { type: String },

    isItemBought: { type: Boolean },
    buyingPrice: { type: Number },
    buyingPriceWithTax: { type: String },
    buyingUnit: { type: String },
    expenseAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    expenseTaxCode: { type: String },
    supplierItemId: { type: String },

    minStockLevel: { type: Number },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    defaultReorderStock: { type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//add acount type link with this
// Define model
module.exports = mongoose.model("Item", itemSchema);
