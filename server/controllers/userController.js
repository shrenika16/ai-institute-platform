const User = require("../models/User");
const Course = require("../models/Course");

// =================================================
// GET ALL USERS
// =================================================

const getUsers = async (
  req,
  res
) => {

  try {

    const users =
      await User.find()
        .select("-password");

    res.status(200).json(
      users
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
// GET SINGLE USER
// =================================================

const getUserById = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.params.id
      ).select("-password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User Not Found",

      });

    }

    res.status(200).json(
      user
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
// UPDATE USER
// =================================================

const updateUser = async (
  req,
  res
) => {

  try {

    const updateData = {
      ...req.body,
    };

    if (req.file) {

      updateData.profileImage =
        req.file.path;

    }

    const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,

        updateData,

        {
          new: true,
        }

      ).select("-password");

    res.status(200).json({

      success: true,

      message:
        "Profile Updated Successfully",

      user: updatedUser,

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
// UPDATE COURSE PROGRESS
// =================================================

const updateCourseProgress = async (
  req,
  res
) => {

  try {

    const {

      userId,

      courseId,

      lessonIndex,

    } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User Not Found",

      });

    }

    const enrolledCourse =
      user.enrolledCourses.find(

        (course) =>

          course.courseId.toString() ===
          courseId

      );

    if (!enrolledCourse) {

      return res.status(404).json({

        success: false,

        message:
          "Course Not Enrolled",

      });

    }

    if (

      !enrolledCourse.completedLessons.includes(
        lessonIndex
      )

    ) {

      enrolledCourse.completedLessons.push(
        lessonIndex
      );

    }

    const course =
      await Course.findById(
        courseId
      );

    enrolledCourse.progress =
      Math.floor(

        (
          enrolledCourse.completedLessons.length /
          course.lessons.length
        ) * 100

      );

    if (

      enrolledCourse.progress === 100

    ) {

      enrolledCourse.completed =
        true;

    }

    await user.save();

    res.status(200).json({

      success: true,

      progress:
        enrolledCourse.progress,

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

const deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

module.exports = {

  getUsers,

  getUserById,

  updateUser,

  updateCourseProgress,

  deleteUser,

};