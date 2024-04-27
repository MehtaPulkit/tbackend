const Quote = require("../models/Quote");
const User = require("../models/User");

// @desc Get all quotes
// @route GET /quotes
// @access Private
const getAllQuotes = async (req, res) => {
  const user = await User.findOne({ email: req.user })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Get all quotes for the user
  const quotes = await Quote.find({ userId: user._id }).lean();

  // If no quotes
  if (!quotes?.length) {
    return res.status(400).json({ message: "No quotes found" });
  }

  res.json(quotes);
};
// @desc Get a quote
// @route GET /quotes/:id
// @access Private
const getQuote = async (req, res) => {
  const id = req.params.id;
  // Get all quotes from MongoDB
  const quote = await Quote.findById(id).exec();
  // If no quotes
  if (!quote) {
    return res.status(400).json({ message: "No quote found" });
  }

  res.json(quote);
};
// @desc Create new quote
// @route POST /quotes
// @access Private
const createNewQuote = async (req, res) => {
  const {
    quoteNo,
    purchaseOrderNo,
    issueDate,
    expiryDate,
    status,
    amountWithTax,
    notes,
    itemId,
    attachments,
    service,
    userId,
    contactId,
    freightAmount,
    freightTaxCode,
  } = req.body;

  // Confirm data
  // Add more logic for new quote
  if (!contactId || !quoteNo || !issueDate || !expiryDate) {
    return res.status(400).json({
      message: "Required fields are not provided",
    });
  }

  const quoteObject = {
    quoteNo,
    purchaseOrderNo,
    issueDate,
    expiryDate,
    status,
    amountWithTax,
    notes,
    itemId,
    attachments,
    service,
    userId,
    contactId,
    freightAmount,
    freightTaxCode,
  };
  // Create and store new quote
  const quote = await Quote.create(quoteObject);

  if (quote) {
    res.status(201).json({ message: `New quote is created` });
  } else {
    res.status(400).json({ message: "Invalid quote data received" });
  }
};

// @desc Update a quote
// @route PATCH /quotes
// @access Private
const updateQuote = async (req, res) => {
  const {
    qID,
    quoteNo,
    purchaseOrderNo,
    issueDate,
    expiryDate,
    status,
    amountWithTax,
    notes,
    itemId,
    attachments,
    service,
    userId,
    contactId,
    freightAmount,
    freightTaxCode,
  } = req.body;
  // Confirm data
  if (!qID) {
    return res.status(400).json({ message: "quote id is required" });
  }

  // Does the quote exist to update?
  const quote = await Quote.findById(qID).exec();

  if (!quote) {
    return res.status(400).json({ message: "quote not found" });
  }

  quote.quoteNo = quoteNo;
  quote.purchaseOrderNo = purchaseOrderNo;
  quote.issueDate = issueDate;
  quote.expiryDate = expiryDate;
  quote.status = status;
  quote.amountWithTax = amountWithTax;
  quote.notes = notes;
  quote.itemId = itemId;
  quote.attachments = attachments;
  quote.service = service;
  quote.userId = userId;
  quote.contactId = contactId;
  quote.freightAmount = freightAmount;
  quote.freightTaxCode = freightTaxCode;

  const updatedquote = await quote.save();

  if (updatedquote) {
    res.status(200).json({ message: `quote details are updated` });
  } else {
    return res.status(400).json({ message: "Some error occured in updating" });
  }
};

// @desc Delete a quote
// @route DELETE /quotes
// @access Private
const deleteQuote = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Quote Id is required" });
  }
  // Does the quote exist to delete?
  const quote = await Quote.findById(id).exec();

  if (!quote) {
    return res.status(400).json({ message: "No quote found" });
  }

  const result = await quote.deleteOne();
  if (result) {
    res.status(200).json({ message: `Quote is deleted` });
  } else {
    return res.status(400).json({ message: "Some error occured in deleting" });
  }
};

module.exports = {
  getAllQuotes,
  getQuote,
  createNewQuote,
  updateQuote,
  deleteQuote,
};
