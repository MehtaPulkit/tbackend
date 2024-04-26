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
    userId,
    quoteId,
    quoteType,
    isActive,
    firstName,
    lastName,
    email,
    designation,
    mobileNo,
    phoneNo,
    abn,
    websiteURl,
    companyName,
    notes,
    billingAddress,
    shippingAddress,
  } = req.body;

  // Confirm data
  // Add more logic for new quote
  if (!quoteType || !designation) {
    return res.status(400).json({
      message: "Quote type and designation are required",
    });
  }
  if (designation == "Company" && !companyName) {
    return res.status(400).json({
      message: "Company name is required",
    });
  }
  if (designation == "Individual" && (!firstName || !lastName)) {
    return res.status(400).json({
      message: "First name and last name are required",
    });
  }

  const quoteObject = {
    userId,
    quoteId,
    quoteType,
    isActive,
    firstName,
    lastName,
    email,
    designation,
    mobileNo,
    phoneNo,
    abn,
    websiteURl,
    companyName,
    notes,
    billingAddress,
    shippingAddress,
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
    cID,
    userId,
    quoteId,
    quoteType,
    isActive,
    firstName,
    lastName,
    email,
    designation,
    mobileNo,
    phoneNo,
    abn,
    websiteURl,
    companyName,
    notes,
    billingAddress,
    shippingAddress,
  } = req.body;
  // Confirm data
  if (!cID) {
    return res.status(400).json({ message: "quote id is required" });
  }

  // Does the quote exist to update?
  const quote = await Quote.findById(cID).exec();

  if (!quote) {
    return res.status(400).json({ message: "quote not found" });
  }

  quote.quoteId = quoteId;
  quote.quoteType = quoteType;
  quote.isActive = isActive;
  quote.firstName = firstName;
  quote.lastName = lastName;
  quote.email = email;
  quote.designation = designation;
  quote.mobileNo = mobileNo;
  quote.phoneNo = phoneNo;
  quote.abn = abn;
  quote.websiteURl = websiteURl;
  quote.companyName = companyName;
  quote.notes = notes;
  quote.billingAddress = billingAddress;
  quote.shippingAddress = shippingAddress;

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
