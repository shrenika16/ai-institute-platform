const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
const AssignmentSubmission = require("../models/AssignmentSubmission");

router.get("/teacher", async (req, res) => {
  try {

    // Total Students
    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    // Attendance
    const totalAttendance =
      await Attendance.countDocuments();

    const presentAttendance =
      await Attendance.countDocuments({
        status: "Present",
      });

    const attendanceRate =
      totalAttendance === 0
        ? 0
        : (
            (presentAttendance /
              totalAttendance) *
            100
          ).toFixed(1);

    // Course Completion
    const completedStudents =
      await User.countDocuments({
        role: "student",
        "enrolledCourses.completed": true,
      });

    const completionRate =
      totalStudents === 0
        ? 0
        : (
            (completedStudents /
              totalStudents) *
            100
          ).toFixed(1);

    // Total Assignments
    const totalAssignments =
      await Assignment.countDocuments();

    // Assignment Analytics
    const totalSubmissions =
      await AssignmentSubmission.countDocuments();

    const approvedSubmissions =
      await AssignmentSubmission.countDocuments({
        status: "Approved",
      });

    const pendingSubmissions =
      await AssignmentSubmission.countDocuments({
        status: "Pending",
      });

    const rejectedSubmissions =
      await AssignmentSubmission.countDocuments({
        status: "Rejected",
      });

    const submissionRate =
      totalAssignments === 0
        ? 0
        : (
            (totalSubmissions /
              totalAssignments) *
            100
          ).toFixed(1);

    // Course Wise Analytics
    const courses =
      await Course.find();

    const users =
      await User.find({
        role: "student",
      });

    const courseAnalytics =
      courses.map((course) => {

        const studentCount =
          users.filter((user) =>
            user.enrolledCourses.some(
              (c) =>
                c.courseId?.toString() ===
                course._id.toString()
            )
          ).length;

        return {
          courseName: course.title,
          students: studentCount,
        };
      });
      
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyMap = {};

      users.forEach((user) => {

        if (!user.createdAt) return;

        const date = new Date(
          user.createdAt
        );

        const month =
          monthNames[
            date.getMonth()
          ];

        if (!monthlyMap[month]) {

          monthlyMap[month] = 0;

        }

        monthlyMap[month]++;

      });

const monthlyAnalytics =
  Object.keys(monthlyMap).map(
    (month) => ({
      month,
      students:
        monthlyMap[month],
    })
  );
      const topCourse =
      courseAnalytics.reduce(
        (prev, current) =>
          prev.students > current.students
            ? prev
            : current,
        courseAnalytics[0]
      );
    const latestCourse =
  await Course.findOne()
    .sort({ createdAt: -1 });

const latestAssignment =
  await Assignment.findOne()
    .sort({ createdAt: -1 });

const latestAttendance =
  await Attendance.findOne()
    .sort({ createdAt: -1 });

const latestSubmission =
  await AssignmentSubmission.findOne()
    .sort({ createdAt: -1 });

const recentActivities = [

  latestCourse && {
    title: `New Course: ${latestCourse.title}`,
    time: new Date(
      latestCourse.createdAt
    ).toLocaleDateString(),
  },

  latestAssignment && {
    title: `Assignment: ${latestAssignment.title}`,
    time: new Date(
      latestAssignment.createdAt
    ).toLocaleDateString(),
  },

  latestAttendance && {
    title: `Attendance: ${latestAttendance.studentName}`,
    time: new Date(
      latestAttendance.createdAt
    ).toLocaleDateString(),
  },

  latestSubmission && {
    title: "Student Submission Received",
    time: new Date(
      latestSubmission.createdAt
    ).toLocaleDateString(),
  },

].filter(Boolean);
    res.json({
    totalStudents,
    attendanceRate,
    completionRate,
    totalAssignments,
    totalSubmissions,
    approvedSubmissions,
    pendingSubmissions,
    rejectedSubmissions,
    submissionRate,
    courseAnalytics,
    monthlyAnalytics,
    topCourse,
    latestCourse,
    latestAssignment,
    latestAttendance,
    latestSubmission,
    recentActivities,
  });
  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Analytics Error",
    });

  }
});

module.exports = router;