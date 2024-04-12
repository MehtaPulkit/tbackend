const express = require("express");
const router = express.Router();
const usersNotificationsController = require("../controllers/userNotificationsController");
const verifyJWT = require("../middleware/verifyJWT");



// router.post("/", usersNotificationsController.createPreference);
//Everything else below needs to be verified
router.use(verifyJWT);
// router
//   .route("/")
//   .get(usersNotificationsController.getAllPreferences)
//   .patch(usersNotificationsController.updatePreference)
//   .delete(usersNotificationsController.deletePreference);


  
router.route("/:id").get(usersNotificationsController.getPreference);


module.exports = router;
