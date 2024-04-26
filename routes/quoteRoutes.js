const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
  .route("/")
  .get(quoteController.getAllQuotes)
  .post(quoteController.createNewQuote)
  .patch(quoteController.updateQuote)
  .delete(quoteController.deleteQuote);

router.route("/:id").get(quoteController.getQuote);

module.exports = router;
