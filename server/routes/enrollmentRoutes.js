const express = require("express");

const router = express.Router();


// =================================================
// IMPORT CONTROLLER
// =================================================

const {

  enrollCourse,

  getEnrollments,

  getStudentEnrollments,

} = require(
  "../controllers/enrollmentController"
);


// =================================================
// ROUTES
// =================================================

// ENROLL COURSE
router.post(
  "/enroll",
  enrollCourse
);

// GET STUDENT ENROLLMENTS
router.get(
  "/:studentId",
  getStudentEnrollments
);

// GET ALL ENROLLMENTS
router.get(
  "/",
  getEnrollments
);


// =================================================

module.exports = router;