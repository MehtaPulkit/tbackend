const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.facebookId && !this.googleId;
      },
    },
    facebookId: String,
    googleId: String,
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    roles: {
      type: [String],
      default: ["Client"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    postalAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    currentAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    dateOfBirth: Date,
    mobileNumber: String,
    profilePicture: String, //Add Profile picture
    lastLogin: Date, //Add Last login code
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
