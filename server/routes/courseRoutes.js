const express = require("express");

const router = express.Router();

const upload = require("../middlewares/multer");

// =================================================
// IMPORT CONTROLLER
// =================================================

const {

  addCourse,

  getCourses,

  getSingleCourse,

  updateCourse,

  deleteCourse,

  enrollStudent,

} = require(
  "../controllers/courseController"
);

// =================================================
// ROUTES
// =================================================

// ADD COURSE

router.post(

  "/add",

  upload.single("thumbnail"),

  addCourse

);

// GET ALL COURSES

router.get(

  "/",

  getCourses

);

// GET SINGLE COURSE

router.get(

  "/:id",

  getSingleCourse

);

// UPDATE COURSE

router.put(

  "/:id",

  upload.single("thumbnail"),

  updateCourse

);

// DELETE COURSE

router.post(
  "/:id/enroll",
  enrollStudent
);

router.delete(

  "/:id",

  deleteCourse

);

// =================================================

module.exports = router;