const User = require("../models/User");
const Assignment = require("../models/Assignment");
const Attendance = require("../models/Attendance");
const QuizResult = require("../models/QuizResult");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const AssignmentSubmission = require("../models/AssignmentSubmission");

const getStudentDashboard = async (req, res) => {

  try {

    const studentId = req.params.id;

    const user = await User.findById(studentId);

    if (!user) {

      return res.status(404).json({
        message: "Student not found",
      });

    }
  
    const totalCourses = user.enrolledCourses.length;

    const completedCourses =
      user.enrolledCourses.filter(
        (course) => course.completed === true
      ).length;

    const attendance =
      await Attendance.find({
        studentId,
      });

    const present =
      attendance.filter(
        (item) => item.status === "Present"
      ).length;

    const attendancePercentage =
      attendance.length === 0
        ? 0
        : Math.round(
            (present / attendance.length) * 100
          );

    const pendingAssignments =
      await Assignment.countDocuments({
        status: "Pending",
      });

    const quizzes =
      await QuizResult.countDocuments({
        studentId,
      });

    res.json({

      totalCourses,

      completedCourses,

      attendancePercentage,

      pendingAssignments,

      quizzes,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};
const getAdminDashboard = async (req, res) => {
  try {

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalTeachers = await User.countDocuments({
      role: "teacher",
    });

    const totalCourses =
      await Course.countDocuments();

    const totalAssignments =
      await Assignment.countDocuments();

    const totalEnrollments =
      await Enrollment.countDocuments();

    const totalSubmissions =
      await AssignmentSubmission.countDocuments();

    res.json({
      totalStudents,
      totalTeachers,
      totalCourses,
      totalAssignments,
      totalEnrollments,
      totalSubmissions,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
const getMonthlyUserAnalytics = async (req, res) => {
  try {
    const users = await User.find();

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlyData = months.map((month) => ({
      month,
      users: 0,
    }));

    users.forEach((user) => {
      const date = new Date(user.createdAt);
      const monthIndex = date.getMonth();

      monthlyData[monthIndex].users += 1;
    });

    res.json(monthlyData);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const getCourseEnrollments = async (req, res) => {
  try {
    const courses = await Course.find();

    const enrollmentData = courses.map((course) => ({
      course: course.title,
      students: course.studentsCount || 0,
    }));

    res.json(enrollmentData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getStudentDashboard,
  getAdminDashboard,
  getMonthlyUserAnalytics,
  getCourseEnrollments,
};