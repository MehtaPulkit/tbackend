const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(addressController.getAllAddresses)
  .post(addressController.createNewAddress)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

router.route("/:id").get(addressController.getAddress);

module.exports = router;
