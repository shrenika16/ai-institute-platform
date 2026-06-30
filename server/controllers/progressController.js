const User = require("../models/User");

// COMPLETE LESSON
const completeLesson = async (req, res) => {

  const {
    studentId,
    courseId,
    lessonIndex,
    totalLessons,
  } = req.body;

  try {

    const user = await User.findById(studentId);

    const course = user.enrolledCourses.find(
      (c) =>
        c.courseId.toString() === courseId
    );

    if (!course) {

      return res.status(404).json({
        message: "Course not found",
      });

    }

    if (
      !course.completedLessons.includes(
        lessonIndex
      )
    ) {

      course.completedLessons.push(
        lessonIndex
      );

    }

    course.progress = Math.floor(
      (
        course.completedLessons.length /
        totalLessons
      ) * 100
    );

    if (course.progress === 100) {

      course.completed = true;

    }

    await user.save();

    res.json({
      success: true,
      progress: course.progress,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// COMPLETE COURSE
const completeCourse = async (
  req,
  res
) => {

  try {

    const {
      studentId,
      courseId,
    } = req.body;

    const user =
      await User.findById(studentId);

    const course =
      user.enrolledCourses.find(
        (c) =>
          c.courseId.toString() ===
          courseId
      );

    if (!course) {

      return res.status(404).json({
        message:
          "Course not found",
      });

    }

    course.progress = 100;

    course.completed = true;

    await user.save();

    res.json({
      success: true,
      message:
        "Course Completed Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  completeLesson,
  completeCourse,
};