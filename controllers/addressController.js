const address = require("../models/Address");
const bcrypt = require("bcrypt");

// @desc Get all addresss
// @route GET /addresss
// @access Private
const getAllAddresses = async (req, res) => {
  // Get all addresss from MongoDB
  const addresses = await address.find().lean();

  // If no addresss
  if (!addresses?.length) {
    return res.status(400).json({ message: "No addresses found" });
  }

  res.json(addresses);
};
const getAddress = async (req, res) => {
  const id = req.params.id;
  // Get all addresss from MongoDB
  const add = await address.findById(id).exec();
  // If no addresss
  if (!add) {
    return res.status(400).json({ message: "No address found" });
  }

  res.json(add);
};
// @desc Create new address
// @route POST /addresss
// @access Private
const createNewAddress = async (req, res) => {
  const { addressLine1, addressLine2, addressType, suburb, state, postalCode } =
    req.body;

  // Confirm data
  if (!addressLine1 || !addressType || !suburb || !state || !postalCode) {
    return res.status(400).json({
      message:
        "Address line1, address type, suburb, state and postalcode are required",
    });
  }

  // Create and store new address
  const address = await address.create(addressObject);

  if (address) {
    //created
    res.status(201).json({ message: `New address is created` });
  } else {
    res.status(400).json({ message: "Invalid address data received" });
  }
};

// @desc Update a address
// @route PATCH /addresss
// @access Private
const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { addressLine1, addressLine2, addressType, suburb, state, postalCode } =
    req.body;

  // Confirm data
  if (!id) {
    return res
      .status(400)
      .json({ message: "address id is required" });
  }

  // Does the address exist to update?
  const address = await address.findById(id).exec();
  console.log(address);
  // return res.json(address);
  if (!address) {
    return res.status(400).json({ message: "address not found" });
  }

  // Check for duplicate
  const duplicate = await address
    .findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original address
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  address.email = email;
  address.roles = roles;
  address.active = active;
  address.facebookId = facebookId;
  address.googleId = googleId;
  address.subscription = subscription;
  address.firstname = firstname;
  address.lastname = lastname;
  address.postalAddress = postalAddress;
  address.currentAddress = currentAddress;
  address.dateOfBirth = dateOfBirth;
  address.mobileNumber = mobileNumber;
  address.profilePicture = profilePicture;
  address.lastLogin = lastLogin;

  if (password) {
    console.log(password);
    console.log(address.password);
    // Hash password
    if (currentPassword == password) {
      return res.status(400).json({
        message: "You cannot use the old password as your new password",
      });
    }
    const match = await bcrypt.compare(currentPassword, address.password);
    console.log(match);
    if (!match)
      return res
        .status(401)
        .json({ message: "Incorrect current password provided" });
    address.password = await bcrypt.hash(password, 10); // salt rounds
  }
  const updatedaddress = await address.save();

  res.status(200).json({ message: `address details are updated` });
};

// @desc Delete a address
// @route DELETE /addresss
// @access Private
const deleteAddress = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "address ID Required" });
  }

  // Does the address still have assigned notes?
  //   const note = await Note.findOne({ address: id }).lean().exec();
  //   if (note) {
  //     return res.status(400).json({ message: "address has assigned notes" });
  //   }

  // Does the address exist to delete?
  const address = await address.findById(id).exec();

  if (!address) {
    return res.status(400).json({ message: "address not found" });
  }

  const result = await address.deleteOne();

  const reply = `Email ${result.email} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllAddresses,
  getAddress,
  createNewAddress,
  updateAddress,
  deleteAddress,
};
