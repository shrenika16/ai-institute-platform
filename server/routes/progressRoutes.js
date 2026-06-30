const express = require("express");

const router = express.Router();

const {
  completeLesson,
  completeCourse,
} = require("../controllers/progressController");

router.post(
  "/complete",
  completeLesson
);

router.post(
  "/complete-course",
  completeCourse
);

module.exports = router;