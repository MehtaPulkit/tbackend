const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
  .route("/")
  .get(jobController.getAllJobs)
  .post(jobController.createNewJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

router.route("/:id").get(jobController.getJob);

module.exports = router;
