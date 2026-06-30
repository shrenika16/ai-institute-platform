const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    assignmentPdf: {
      type: String,
      default: "",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalMarks: {
      type: Number,
      default: 100,
    },
    
    assignmentPdf: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Completed"],
      default: "Active",
    },
  },

  {
    timestamps: true,
  }

);

module.exports =
  mongoose.models.Assignment ||
  mongoose.model(
    "Assignment",
    assignmentSchema
  );