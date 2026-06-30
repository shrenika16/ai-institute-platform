const express = require("express");

const router = express.Router();


// =================================================
// IMPORT CONTROLLER
// =================================================

const {

  createQuiz,
  getQuizzes,
  deleteQuiz,
  submitQuiz,
  getQuizResults,
  getStudentQuizResults,
  getStudentQuizHistory,
  getStudentResults,
  getQuizAnalytics,
  getQuizAttemptsChart,
  getTopStudentsLeaderboard,
  getLeaderboard,

} = require(
  "../controllers/quizController"
);

// =================================================
// ROUTES
// =================================================

// CREATE QUIZ
router.post(
  "/create",
  createQuiz
);


// GET ALL QUIZZES
router.get(
  "/",
  getQuizzes
);


// DELETE QUIZ
router.delete(
  "/:id",
  deleteQuiz
);

// SUBMIT QUIZ
router.post(
  "/submit/:quizId",
  submitQuiz
);

// GET QUIZ RESULTS

router.get(
  "/results",
  getQuizResults
);

router.get(
  "/student-results/:studentId",
  getStudentQuizResults
);

router.get(
  "/student-history/:studentId",
  getStudentQuizHistory
);

router.get(
  "/results/:studentId",
  getStudentResults
);

router.get(
  "/analytics",
  getQuizAnalytics
);

router.get(
  "/attempts-chart",
  getQuizAttemptsChart
);

router.get(
  "/leaderboard",
  getTopStudentsLeaderboard
);

router.get(
  "/leaderboard",
  getLeaderboard
);

// =================================================

module.exports = router;