const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },

    profileImage: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "No bio added yet",
    },

    phone: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    // ENROLLED COURSES

    enrolledCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },

        completedLessons: [
          {
            type: Number,
          },
        ],

        progress: {
          type: Number,
          default: 0,
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);