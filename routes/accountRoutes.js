const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
  .route("/")
  .get(accountController.getAllAccounts)
  .post(accountController.createNewAccount)
  .patch(accountController.updateAccount)
  .delete(accountController.deleteAccount);

router.route("/:id").get(accountController.getAccount);

module.exports = router;
