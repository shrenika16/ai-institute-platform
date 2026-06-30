const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model(
  "Enrollment",
  enrollmentSchema
);