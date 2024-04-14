const NotificationPreference = require("../models/NotificationPreference");

const getPreference = async (req, res) => {
  const id = req.params.id;
  // Get all preferences from MongoDB
  const nPreference = await NotificationPreference.findById(id).exec();
  // If no preferences
  if (!nPreference) {
    return res.status(400).json({ message: "No notification preference found" });
  }

  res.json(nPreference);
};

module.exports = {
  getPreference,
};
