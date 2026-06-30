const express = require("express");

const router = express.Router();


// =================================================
// IMPORT CONTROLLER
// =================================================

const {

  markAttendance,

  getAttendance,

  getStudentAttendance,

  updateAttendance,

  deleteAttendance,

  getAttendanceAnalytics,

  getAttendanceHistory,

  getAttendanceChart,

} = require(
  "../controllers/attendanceController"
);


// =================================================
// ROUTES
// =================================================

// MARK ATTENDANCE
router.post(
  "/mark",
  markAttendance
);


// GET ALL ATTENDANCE
router.get(
  "/",
  getAttendance
);

router.get(
  "/analytics",
  getAttendanceAnalytics
);

router.get(
  "/history/:studentId",
  getAttendanceHistory
);

router.get(
  "/chart",
  getAttendanceChart
);

// GET STUDENT ATTENDANCE
router.get(
  "/:studentId",
  getStudentAttendance
);

// UPDATE ATTENDANCE
router.put(
  "/:id",
  updateAttendance
);

// DELETE ATTENDANCE
router.delete(
  "/:id",
  deleteAttendance
);



// =================================================

module.exports = router;