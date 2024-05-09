const TaxCode = require("../models/TaxCode");
const User = require("../models/User");

// @desc Get all taxCodes
// @route GET /taxCodes
// @access Private
const getAllTaxCodes = async (req, res) => {
  const user = await User.findOne({ email: req.user })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Get all taxCodes for the user
  const taxCodes = await TaxCode.find({ userId: user._id }).lean();

  // If no taxCodes
  if (!taxCodes?.length) {
    return res.status(400).json({ message: "No taxCodes found" });
  }

  res.json(taxCodes);
};
// @desc Get a taxCode
// @route GET /taxCodes/:id
// @access Private
const getTaxCode = async (req, res) => {
  const id = req.params.id;
  // Get all taxCodes from MongoDB
  const taxCode = await TaxCode.findById(id).exec();
  // If no taxCodes
  if (!taxCode) {
    return res.status(400).json({ message: "No taxCode found" });
  }

  res.json(taxCode);
};
// @desc Create new taxCode
// @route POST /taxCodes
// @access Private
const createNewTaxCode = async (req, res) => {
  const {
    userId,
    taxCode,
    description,
    taxType,
    rate,
    creditWithholdingAccount,
    payableWithholdingAccount,
    linkedTaxContact,
    accruedDutyAccount,
    linkedImportAgent,
    taxCollectedAccount,
    taxPaidAccount,
    lctThreshold,
  } = req.body;

  // Confirm data
  // Add more logic for new taxCode
  if (!taxCode) {
    return res.status(400).json({
      message: "Tax code is required",
    });
  }
  if (!userId) {
    return res.status(400).json({
      message: "User Id is required",
    });
  }
  const taxCodeObject = {
    userId,
    taxCode,
    description,
    taxType,
    rate,
    creditWithholdingAccount,
    payableWithholdingAccount,
    linkedTaxContact,
    accruedDutyAccount,
    linkedImportAgent,
    taxCollectedAccount,
    taxPaidAccount,
    lctThreshold,
  };
  // Create and store new taxCode
  const taxCodeRes = await TaxCode.create(taxCodeObject);

  if (taxCodeRes) {
    res.status(201).json({ message: `New taxCode is created` });
  } else {
    res.status(400).json({ message: "Invalid taxCode data received" });
  }
};

// @desc Update a taxCode
// @route PATCH /taxCodes
// @access Private
const updateTaxCode = async (req, res) => {
  const {
    taxCodeId,
    taxCode,
    description,
    taxType,
    rate,
    creditWithholdingAccount,
    payableWithholdingAccount,
    linkedTaxContact,
    accruedDutyAccount,
    linkedImportAgent,
    taxCollectedAccount,
    taxPaidAccount,
    lctThreshold,
  } = req.body;
  // Confirm data
  if (!taxCodeId) {
    return res.status(400).json({ message: "taxCode id is required" });
  }

  // Does the taxCode exist to update?
  const taxCodeRes = await TaxCode.findById(taxCodeId).exec();

  if (!taxCodeRes) {
    return res.status(400).json({ message: "taxCode not found" });
  }

  taxCodeRes.taxCode = taxCode;
  taxCodeRes.description = description;
  taxCodeRes.taxType = taxType;
  taxCodeRes.rate = rate;
  taxCodeRes.creditWithholdingAccount = creditWithholdingAccount;
  taxCodeRes.payableWithholdingAccount = payableWithholdingAccount;
  taxCodeRes.linkedTaxContact = linkedTaxContact;
  taxCodeRes.accruedDutyAccount = accruedDutyAccount;
  taxCodeRes.linkedImportAgent = linkedImportAgent;
  taxCodeRes.taxCollectedAccount = taxCollectedAccount;
  taxCodeRes.taxPaidAccount = taxPaidAccount;
  taxCodeRes.lctThreshold = lctThreshold;

  const updatedtaxCode = await taxCodeRes.save();

  if (updatedtaxCode) {
    res.status(200).json({ message: `taxCode details are updated` });
  } else {
    return res.status(400).json({ message: "Some error occured in updating" });
  }
};

// @desc Delete a taxCode
// @route DELETE /taxCodes
// @access Private
const deleteTaxCode = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "TaxCode Id is required" });
  }
  // Does the taxCode exist to delete?
  const taxCode = await TaxCode.findById(id).exec();

  if (!taxCode) {
    return res.status(400).json({ message: "No taxCode found" });
  }

  const result = await taxCode.deleteOne();
  if (result) {
    res.status(200).json({ message: `TaxCode is deleted` });
  } else {
    return res.status(400).json({ message: "Some error occured in deleting" });
  }
};
// @desc Get all users
// @route GET /users/check
// @access Public
const checkDuplicate = async (req, res) => {
  const { taxCode } = req.body;
  const duplicate = await TaxCode.findOne({ taxCode })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({
      message: "A tax code already exists, please check tax code and try again.",
    });
  } else {
    return res.status(200).json({ message: "New user" });
  }
};
module.exports = {
  getAllTaxCodes,
  getTaxCode,
  createNewTaxCode,
  updateTaxCode,
  deleteTaxCode,
  checkDuplicate
};
