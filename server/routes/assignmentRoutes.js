const express = require("express");

const router = express.Router();

const uploadPdf = require("../middlewares/uploadPdf");

const {

  createAssignment,

  getAssignments,

  getSingleAssignment,

  updateAssignment,

  deleteAssignment,

} = require(
  "../controllers/assignmentController"
);



// CREATE
router.post(
  "/create",

  (req, res, next) => {
    console.log("Route Hit");
    next();
  },

  uploadPdf.single("assignmentPdf"),

  (req, res, next) => {
    console.log("After Multer");
    console.log(req.file);
    next();
  },

  createAssignment
);

// GET ALL
router.get(
  "/",
  getAssignments
);

// GET SINGLE
router.get(
  "/:id",
  getSingleAssignment
);

// UPDATE
router.put(
  "/:id",
  updateAssignment
);

// DELETE
router.delete(
  "/:id",
  deleteAssignment
);

module.exports = router;