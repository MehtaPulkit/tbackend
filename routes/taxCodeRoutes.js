const express = require("express");
const router = express.Router();
const taxCodeController = require("../controllers/taxCodeController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
  .route("/")
  .get(taxCodeController.getAllTaxCodes)
  .post(taxCodeController.createNewTaxCode)
  .patch(taxCodeController.updateTaxCode)
  .delete(taxCodeController.deleteTaxCode);

router.route("/:id").get(taxCodeController.getTaxCode);
router.route("/check").post(taxCodeController.checkDuplicate);
module.exports = router;
