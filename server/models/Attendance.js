const mongoose = require("mongoose");

const attendanceSchema =
  new mongoose.Schema(

    {
      studentId: {
        type: String,
        required: true,
      },

      studentName: {
        type: String,
      },
      
      courseId: {
        type: String,
        required: true,
      },
      
      status: {
        type: String,

        enum: [
          "Present",
          "Absent",
        ],

        default: "Present",
      },

      date: {
        type: String,

        required: true,
      },
    },

    {
      timestamps: true,
    }
  );


// PREVENT DUPLICATE ATTENDANCE
attendanceSchema.index(
  {
    studentId: 1,
    date: 1,
  },

  {
    unique: true,
  }
);

module.exports =
  mongoose.models.Attendance ||

  mongoose.model(
    "Attendance",
    attendanceSchema
  );