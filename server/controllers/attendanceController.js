const Attendance =
  require("../models/Attendance");

// ==========================================
// MARK ATTENDANCE
// ==========================================

const markAttendance = async (req, res) => {

  try {

    const {
      studentId,
      studentName,
      courseId,
      status,
      date,
    } = req.body;

    // Duplicate check
    const alreadyMarked = await Attendance.findOne({
      studentId,
      date,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: "Attendance already marked",
      });
    }

    // Save attendance
    const attendance = await Attendance.create({
      studentId,
      studentName,
      courseId,
      status,
      date,
    });

    res.status(201).json({
      message: "Attendance Marked Successfully",
      attendance,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// ==========================================
// GET ALL ATTENDANCE
// ==========================================

const getAttendance =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.find();

      res.json(attendance);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

  };


// ==========================================
// GET STUDENT ATTENDANCE
// ==========================================

const getStudentAttendance =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.find({

          studentId:
            req.params.studentId,

        });

      res.json(attendance);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

  };


// ==========================================

// ==========================================
// UPDATE ATTENDANCE
// ==========================================

const updateAttendance =
  async (req, res) => {

    try {

      const updatedAttendance =
        await Attendance.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      res.json({

        message:
          "Attendance Updated Successfully",

        updatedAttendance,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

  };

  // ==========================================
// ATTENDANCE ANALYTICS
// ==========================================

const getAttendanceAnalytics = async (req, res) => {

  try {

    const attendance = await Attendance.find();

    console.log("Attendance Data =", attendance);

    const studentStats = {};

    attendance.forEach((item) => {

      if (!studentStats[item.studentId]) {

        studentStats[item.studentId] = {

          studentName: item.studentName,
          present: 0,
          total: 0,

        };

      }

      studentStats[item.studentId].total++;

      if (item.status === "Present") {

        studentStats[item.studentId].present++;

      }

    });

    const analytics = Object.values(studentStats).map((student) => ({

    ...student,

    percentage:
      ((student.present / student.total) * 100).toFixed(1),

  }));

  console.log("Analytics =", analytics);

  res.json(analytics);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ==========================================
// STUDENT ATTENDANCE HISTORY
// ==========================================

const getAttendanceHistory = async (req, res) => {

  try {

    const attendance = await Attendance.find({
      studentId: req.params.studentId
    }).sort({ createdAt: -1 });

    res.json(attendance);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};
// ==========================================
// ATTENDANCE CHART
// ==========================================

const getAttendanceChart =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.find();

      const present =
        attendance.filter(
          (item) =>
            item.status === "Present"
        ).length;

      const absent =
        attendance.filter(
          (item) =>
            item.status === "Absent"
        ).length;

      res.json({

        present,
        absent,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  };
// ==========================================
// DELETE ATTENDANCE
// ==========================================

const deleteAttendance =
  async (req, res) => {

    try {

      await Attendance.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Attendance Deleted Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

  };

module.exports = {

  markAttendance,
  getAttendance,
  getStudentAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceAnalytics,
  getAttendanceHistory,
  getAttendanceChart,

};