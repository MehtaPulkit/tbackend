const Job = require("../models/Job");
const User = require("../models/User");

// @desc Get all jobs
// @route GET /jobs
// @access Private
const getAllJobs = async (req, res) => {
  const user = await User.findOne({ email: req.user })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Get all jobs for the user
  const jobs = await Job.find({ userId: user._id }).lean();

  // If no jobs
  if (!jobs?.length) {
    return res.status(400).json({ message: "No jobs found" });
  }

  res.json(jobs);
};
// @desc Get a job
// @route GET /jobs/:id
// @access Private
const getJob = async (req, res) => {
  const id = req.params.id;
  // Get all jobs from MongoDB
  const job = await Job.findById(id).exec();
  // If no jobs
  if (!job) {
    return res.status(400).json({ message: "No job found" });
  }

  res.json(job);
};
// @desc Create new job
// @route POST /jobs
// @access Private
const createNewJob = async (req, res) => {
  const { jobNo, jobName, description, contactId, userId, inActive } = req.body;
  // Confirm data
  // Add more logic for new job
  if (!jobNo || !userId || jobName) {
    return res.status(400).json({
      message: "Required fields are not provided",
    });
  }

  const jobObject = {
    jobNo,
    jobName,
    description,
    contactId,
    userId,
    inActive,
  };
  // Create and store new job
  const job = await Job.create(jobObject);

  if (job) {
    res.status(201).json({ message: `New job is created` });
  } else {
    res.status(400).json({ message: "Invalid job data received" });
  }
};

// @desc Update a job
// @route PATCH /jobs
// @access Private
const updateJob = async (req, res) => {
  const { jobId, jobNo, jobName, description, contactId, inActive } = req.body;
  console.log(req.body);
  // Confirm data
  if (!jobId) {
    return res.status(400).json({ message: "job id is required" });
  }

  // Does the job exist to update?
  const job = await Job.findById(jobId).exec();

  if (!job) {
    return res.status(400).json({ message: "job not found" });
  }

  job.jobNo = jobNo;
  job.jobName = jobName;
  job.description = description;
  job.contactId = contactId;
  job.inActive = inActive;

  const updatedjob = await job.save();

  if (updatedjob) {
    res.status(200).json({ message: `job details are updated` });
  } else {
    return res.status(400).json({ message: "Some error occured in updating" });
  }
};

// @desc Delete a job
// @route DELETE /jobs
// @access Private
const deleteJob = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Job Id is required" });
  }
  // Does the job exist to delete?
  const job = await Job.findById(id).exec();

  if (!job) {
    return res.status(400).json({ message: "No job found" });
  }

  const result = await job.deleteOne();
  if (result) {
    res.status(200).json({ message: `Job is deleted` });
  } else {
    return res.status(400).json({ message: "Some error occured in deleting" });
  }
};

module.exports = {
  getAllJobs,
  getJob,
  createNewJob,
  updateJob,
  deleteJob,
};
