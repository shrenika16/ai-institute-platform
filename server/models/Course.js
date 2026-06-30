const mongoose = require("mongoose");

/* ================= LESSON SCHEMA ================= */

const lessonSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

  });

/* ================= COURSE SCHEMA ================= */

const courseSchema =
  new mongoose.Schema(

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

      duration: {
        type: String,
        required: true,
        trim: true,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      // ================= COURSE IMAGE =================

      thumbnail: {
        type: String,
        default: "",
      },

      // ================= PDF NOTES =================

      notesPdf: {
        type: String,
        default: "",
      },

      // ================= LESSONS =================

      lessons: [lessonSchema],

      // ================= EXTRA RESOURCES =================

      resources: [

        {
          title: String,

          link: String,
        },

      ],

      // ================= OPTIONAL FIELDS =================

      instructor: {
        type: String,
        default: "",
      },

      category: {
        type: String,
        default: "",
      },

      level: {
        type: String,
        default: "Beginner",
      },

      studentsCount: {
        type: Number,
        default: 0,
      },

      enrolledStudents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      status: {
        type: String,
        enum: ["Draft", "Published", "Archived"],
        default: "Draft",
      },
    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Course",
    courseSchema
  );