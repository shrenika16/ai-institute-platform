const Course = require(
  "../models/Course"
);

// =================================================
// ADD COURSE
// =================================================

const addCourse = async (
  req,
  res
) => {

  try {

    const {
    title,
    description,
    duration,
    price,
    instructor,
    category,
    level,
    status,
    studentsCount,
  } = req.body;

    const lessons = req.body.lessons
      ? JSON.parse(req.body.lessons)
      : [];

    // =================================================
    // CLOUDINARY IMAGE URL
    // =================================================

    const thumbnail =
      req.file?.path || "";

    // =================================================
    // VALIDATION
    // =================================================

    if (

      !title ||

      !description ||

      !duration ||

      !price

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all required fields",

      });

    }

    // =================================================
    // CREATE COURSE
    // =================================================

    const newCourse = new Course({
        title,
        description,
        duration,
        price,
        thumbnail,
        instructor,
        category,
        level,
        status,
        studentsCount,
        lessons,
      });

    await newCourse.save();

    // =================================================

    res.status(201).json({

      success: true,

      message:
        "Course Added Successfully",

      course: newCourse,

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
// GET ALL COURSES
// =================================================

const getCourses = async (
  req,
  res
) => {

  try {

    const courses =
      await Course.find().sort({

        createdAt: -1,

      });

    res.status(200).json(
      courses
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
// GET SINGLE COURSE
// =================================================

const getSingleCourse = async (
  req,
  res
) => {

  try {

    const course =
      await Course.findById(
        req.params.id
      );

    console.log("DB COURSE:", course);

    if (!course) {

      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });

    }

    res.status(200).json(course);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// =================================================
// UPDATE COURSE
// =================================================

const updateCourse = async (req, res) => {

  try {

    const updateData = {
      ...req.body,
    };

    // Thumbnail
    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    // Lessons
    if (req.body.lessons) {
      updateData.lessons = JSON.parse(req.body.lessons);
    }

    const updatedCourse =
      await Course.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course: updatedCourse,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// =================================================
// DELETE COURSE
// =================================================

const deleteCourse = async (
  req,
  res
) => {

  try {

    const deletedCourse =
      await Course.findByIdAndDelete(
        req.params.id
      );

    if (!deletedCourse) {

      return res.status(404).json({

        success: false,

        message:
          "Course Not Found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Course Deleted Successfully",

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
const enrollStudent = async (
  req,
  res
) => {

  try {

    const { userId } = req.body;

    const course =
      await Course.findById(
        req.params.id
      );

    if (!course) {

      return res.status(404).json({
        message: "Course Not Found",
      });

    }

    if (
      course.enrolledStudents.includes(
        userId
      )
    ) {

      return res.status(400).json({
        message:
          "Already Enrolled",
      });

    }

    course.enrolledStudents.push(
      userId
    );

    await course.save();

    res.json({
      success: true,
      message:
        "Enrollment Successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
// =================================================

module.exports = {

  addCourse,

  getCourses,

  getSingleCourse,

  updateCourse,

  deleteCourse,

  enrollStudent,
  
};