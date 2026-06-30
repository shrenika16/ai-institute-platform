const express =
  require("express");

const router =
  express.Router();

const upload = 
  require("../middlewares/upload");

const {
  submitAssignment,
  getAllSubmissions,
  updateSubmissionStatus,
  getStudentSubmissions,
  updateSubmission,
} = require(
  "../controllers/assignmentSubmissionController"
);

router.post(
  "/submit",
  upload.single("file"),
  submitAssignment
);

router.get(
  "/",
  getAllSubmissions
);

router.get(
  "/student/:studentId",
  getStudentSubmissions
);

router.put(
  "/:id/status",
  updateSubmissionStatus
);

router.put(

"/update/:id",

upload.single("file"),

updateSubmission

);

module.exports =
  router;