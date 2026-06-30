const express = require("express");

const router = express.Router();

const {
  getStudentDashboard,
  getAdminDashboard,
  getMonthlyUserAnalytics,
  getCourseEnrollments,
} = require("../controllers/dashboardController");

// Student Dashboard
router.get(
  "/student/:id",
  getStudentDashboard
);

router.get(
  "/admin",
  getAdminDashboard
);

router.get(
  "/monthly-users",
  getMonthlyUserAnalytics
);

router.get(
  "/course-enrollments",
  getCourseEnrollments
);

module.exports = router;