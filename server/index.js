const express = require("express");

const cors = require("cors");

require("dotenv").config();

const progressRoutes =
require("./routes/progressRoutes");

const assignmentSubmissionRoutes =
require("./routes/assignmentSubmissionRoutes");

const analyticsRoutes =
require("./routes/analyticsRoutes");


// =================================================
// DATABASE CONNECTION
// =================================================

const connectDB =
  require("./config/db");

connectDB();



// =================================================
// EXPRESS APP
// =================================================

const app = express();


// =================================================
// MIDDLEWARES
// =================================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
"/api/progress",
progressRoutes
);

app.use(
  "/api/submissions",
  assignmentSubmissionRoutes
);

app.use("/uploads", express.static("uploads"));

// =================================================
// IMPORT ROUTES
// =================================================

const authRoutes =
  require("./routes/authRoutes");

const courseRoutes =
  require("./routes/courseRoutes");

const enrollmentRoutes =
  require("./routes/enrollmentRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const quizRoutes =
  require("./routes/quizRoutes");

const assignmentRoutes =
  require("./routes/assignmentRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const dashboardRoutes = 
  require("./routes/dashboardRoutes");

const userRoutes =
  require("./routes/userRoutes");

const notificationRoutes = 
  require("./routes/notificationRoutes");


// ================= TEST ROUTE =================

const testRoutes =
  require("./routes/testRoutes");


// =================================================
// API ROUTES
// =================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/courses",
  courseRoutes
);

app.use(
  "/api/enrollments",
  enrollmentRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/quiz",
  quizRoutes
);

app.use(
  "/api/assignments",
  assignmentRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/dashboard", 
  dashboardRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/notifications", 
    notificationRoutes
);

// ================= TEST API =================

app.use(
  "/api/test",
  testRoutes
);


// =================================================
// HOME ROUTE
// =================================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "🚀 AI Institute Platform Backend Running Successfully",

  });

});


// =================================================
// 404 ROUTE
// =================================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      "API Route Not Found",

  });

});


// =================================================
// GLOBAL ERROR HANDLER
// =================================================

app.use(

  (
    err,
    req,
    res,
    next
  ) => {

    console.log(
      "SERVER ERROR:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Internal Server Error",

    });

  }

);


// =================================================
// SERVER
// =================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});