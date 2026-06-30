const Enrollment = require(
  "../models/Enrollment"
);
const Course = require("../models/Course");
const User = require("../models/User");

// =================================================
// ENROLL COURSE
// =================================================

const enrollCourse = async (
  req,
  res
) => {

  try {

    const {
      studentId,
      courseId,
    } = req.body;

    // VALIDATION

    if (
      !studentId ||
      !courseId
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Student and Course required",

      });

    }

    // CHECK EXISTING

    const existingEnrollment =
      await Enrollment.findOne({

        studentId,
        courseId,

      });

    if (existingEnrollment) {

      return res.status(400).json({

        success: false,

        message:
          "Already Enrolled",

      });

    }

    // CREATE ENROLLMENT

    const enrollment =
      new Enrollment({

        studentId,
        courseId,

      });

    await enrollment.save();
    

      await User.findByIdAndUpdate(
          studentId,
          {
            $push: {
              enrolledCourses: {
                courseId,
                completedLessons: [],
                progress: 0,
                completed: false,
              },
            },
          }
      );

    await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: {
          enrolledStudents: studentId,
        },
      }
    );

    res.status(201).json({

      success: true,

      message:
        "Course Enrolled Successfully",

      enrollment,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};


// =================================================
// GET ENROLLMENTS
// =================================================

const getEnrollments = async (
  req,
  res
) => {

  try {

    const enrollments =
      await Enrollment.find()
        .populate("studentId")
        .populate("courseId");

    res.status(200).json(
      enrollments
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};

const getStudentEnrollments =
  async (req, res) => {

    try {

      const enrollments =
        await Enrollment.find({

          studentId:
            req.params.studentId,

        }).populate("courseId");

      res.status(200).json(
        enrollments
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };
// =================================================

module.exports = {

  enrollCourse,

  getEnrollments,

  getStudentEnrollments,

};