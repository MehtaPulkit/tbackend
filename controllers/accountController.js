const Account = require("../models/Account");
const User = require("../models/User");

// @desc Get all accounts
// @route GET /accounts
// @access Private
const getAllAccounts = async (req, res) => {
  const user = await User.findOne({ email: req.user })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Get all accounts for the user
  const accounts = await Account.find({ userId: user._id }).lean();

  // If no accounts
  if (!accounts?.length) {
    return res.status(400).json({ message: "No accounts found" });
  }

  res.json(accounts);
};
// @desc Get a account
// @route GET /accounts/:id
// @access Private
const getAccount = async (req, res) => {
  const id = req.params.id;
  // Get all accounts from MongoDB
  const account = await Account.findById(id).exec();
  // If no accounts
  if (!account) {
    return res.status(400).json({ message: "No account found" });
  }

  res.json(account);
};
// @desc Create new account
// @route POST /accounts
// @access Private
const createNewAccount = async (req, res) => {
  const {
    userId,
    accountType,
    accountCode,
    accountName,
    taxCode,
    notes,
    openingBalance,
    classifyCashFlow,
    isActive,
    bankDetails,
  } = req.body;

  // Confirm data
  // Add more logic for new account
  if (!accountType || !accountCode || !accountName) {
    return res.status(400).json({
      message: "Account Type, Code and Name are required",
    });
  }
  if (!userId) {
    return res.status(400).json({
      message: "User Id is required",
    });
  }
  const accountObject = {
    userId,
    accountType,
    accountCode,
    accountName,
    taxCode,
    notes,
    openingBalance,
    classifyCashFlow,
    isActive,
    bankDetails,
  };
  // Create and store new account
  const accountRes = await Account.create(accountObject);

  if (accountRes) {
    res.status(201).json({ message: `New account is created` });
  } else {
    res.status(400).json({ message: "Invalid account data received" });
  }
};

// @desc Update a account
// @route PATCH /accounts
// @access Private
const updateAccount = async (req, res) => {
  const {
    accountId,
    accountType,
    accountCode,
    accountName,
    taxCode,
    notes,
    openingBalance,
    classifyCashFlow,
    isActive,
    bankDetails,
  } = req.body;
  // Confirm data
  if (!accountId) {
    return res.status(400).json({ message: "account id is required" });
  }

  // Does the account exist to update?
  const accountRes = await Account.findById(accountId).exec();

  if (!accountRes) {
    return res.status(400).json({ message: "account not found" });
  }

  accountRes.accountId = accountId;
  accountRes.accountType = accountType;
  accountRes.accountCode = accountCode;
  accountRes.accountName = accountName;
  accountRes.taxCode = taxCode;
  accountRes.notes = notes;
  accountRes.openingBalance = openingBalance;
  accountRes.classifyCashFlow = classifyCashFlow;
  accountRes.isActive = isActive;
  accountRes.bankDetails = bankDetails;

  const updatedaccount = await accountRes.save();

  if (updatedaccount) {
    res.status(200).json({ message: `account details are updated` });
  } else {
    return res.status(400).json({ message: "Some error occured in updating" });
  }
};

// @desc Delete a account
// @route DELETE /accounts
// @access Private
const deleteAccount = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Account Id is required" });
  }
  // Does the account exist to delete?
  const account = await Account.findById(id).exec();

  if (!account) {
    return res.status(400).json({ message: "No account found" });
  }

  const result = await account.deleteOne();
  if (result) {
    res.status(200).json({ message: `Account is deleted` });
  } else {
    return res.status(400).json({ message: "Some error occured in deleting" });
  }
};

module.exports = {
  getAllAccounts,
  getAccount,
  createNewAccount,
  updateAccount,
  deleteAccount,
};
