const Contact = require("../models/Contact");

// @desc Get all contacts
// @route GET /contacts
// @access Private
const getAllContacts = async (req, res) => {
  // Get all contacts from MongoDB
  const contacts = await Contact.find().lean();

  // If no contacts
  if (!contacts?.length) {
    return res.status(400).json({ message: "No contacts found" });
  }

  res.json(contacts);
};
const getContact = async (req, res) => {
  const id = req.params.id;
  // Get all contacts from MongoDB
  const add = await Contact.findById(id).exec();
  // If no contacts
  if (!add) {
    return res.status(400).json({ message: "No contact found" });
  }

  res.json(add);
};
// @desc Create new contact
// @route POST /contacts
// @access Private
const createNewContact = async (req, res) => {
  const {
    contactId,
    contactType,
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
  } = req.body;

  // Confirm data
  // Add more logic for new contact
  if (!contactType) {
    return res.status(400).json({
      message: "Contact type is required",
    });
  }

  // Create and store new contact
  const contact = await Contact.create(contactObject);

  if (contact) {
    //created
    res.status(201).json({ message: `New contact is created` });
  } else {
    res.status(400).json({ message: "Invalid contact data received" });
  }
};

// @desc Update a contact
// @route PATCH /contacts
// @access Private
const updateContact = async (req, res) => {
  const { id } = req.params;
  const {
    contactId,
    contactType,
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
  } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "contact id is required" });
  }

  // Does the contact exist to update?
  const contact = await Contact.findById(id).exec();
  console.log(contact);
  // return res.json(contact);
  if (!contact) {
    return res.status(400).json({ message: "contact not found" });
  }

  contact.contactId = contactId;
  contact.contactType = contactType;
  contact.isActive = isActive;
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.email = email;
  contact.designation = designation;
  contact.mobileNo = mobileNo;
  contact.phoneNo = phoneNo;
  contact.abn = abn;
  contact.websiteURl = websiteURl;
  contact.companyName = companyName;
  contact.notes = notes;

  const updatedcontact = await contact.save();

  res.status(200).json({ message: `contact details are updated` });
};

// @desc Delete a contact
// @route DELETE /contacts
// @access Private
const deleteContact = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "contact ID Required" });
  }
  // Does the contact exist to delete?
  const contact = await Contact.findById(id).exec();

  if (!contact) {
    return res.status(400).json({ message: "contact not found" });
  }

  const result = await contact.deleteOne();

  const reply = `Contact is deleted`;

  res.json(reply);
};

module.exports = {
  getAllContacts,
  getContact,
  createNewContact,
  updateContact,
  deleteContact,
};
