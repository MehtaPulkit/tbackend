const NotificationPreference = require("../models/NotificationPreference");
const User = require("../models/User");

const getPreference = async (req, res) => {
  const id = req.params.id;

  console.log(id);
  // Get all users from MongoDB
  const nPreference = await NotificationPreference.findById(id).exec();
  // If no users
  if (!nPreference) {
    return res.status(400).json({ message: "No notification preference found" });
  }

  res.json(nPreference);
};

module.exports = {
  getPreference,
};
