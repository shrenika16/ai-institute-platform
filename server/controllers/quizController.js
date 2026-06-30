const Quiz = 
  require("../models/Quiz");
const QuizResult =
  require("../models/QuizResult");

// =================================================
// CREATE QUIZ
// =================================================

const createQuiz = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      difficulty,
      createdBy,
      questions,
    } = req.body;

    // VALIDATION

    if (
      !title ||
      !questions ||
      questions.length === 0
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Quiz title and questions are required",

      });

    }

    // CREATE QUIZ

    const newQuiz =
      new Quiz({

        title,
        description,
        difficulty,
        createdBy,
        questions,

      });

    await newQuiz.save();

    res.status(201).json({

      success: true,

      message:
        "Quiz Created Successfully",

      quiz: newQuiz,

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
// GET ALL QUIZZES
// =================================================

const getQuizzes = async (
  req,
  res
) => {

  try {

    const quizzes =
      await Quiz.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      quizzes
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
// DELETE QUIZ
// =================================================

const deleteQuiz = async (
  req,
  res
) => {

  try {

    const deletedQuiz =
      await Quiz.findByIdAndDelete(
        req.params.id
      );

    if (!deletedQuiz) {

      return res.status(404).json({

        success: false,

        message:
          "Quiz Not Found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Quiz Deleted Successfully",

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
// SUBMIT QUIZ
// =================================================

const submitQuiz = async (
  req,
  res
) => {

  try {

    const { quizId } =
      req.params;

    const {
      answers,
      studentId,
    } = req.body;
        // FIND QUIZ

    const quiz =
      await Quiz.findById(
        quizId
      );

    if (!quiz) {

      return res.status(404).json({

        success: false,

        message:
          "Quiz Not Found",

      });

    }

    // SCORE CALCULATION

    let score = 0;

    quiz.questions.forEach(
      (question, index) => {

        if (
          answers[index] ===
          question.answer
        ) {

          score++;

        }

      }
    );


    // SAVE RESULT

    const newResult =
      new QuizResult({

        studentId,

        quizId,

        score,

        total:
          quiz.questions.length,

      });

    await newResult.save();


    // RESPONSE

    res.status(200).json({

      success: true,

      score,

      total:
        quiz.questions.length,

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

// =================================================
// GET QUIZ RESULTS
// =================================================

const getQuizResults = async (
  req,
  res
) => {

  try {

    const results =
      await QuizResult.find()
        .populate(
          "studentId",
          "name email"
        )
        .populate(
          "quizId",
          "title"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({

      success: true,

      results,

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
const getStudentQuizResults = async (
  req,
  res
) => {

  try {

    const results =
      await QuizResult.find({

        studentId:
          req.params.studentId,

      })
        .populate(
          "quizId",
          "title"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({

      success: true,

      results,

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
// GET STUDENT QUIZ HISTORY
// =================================================

const getStudentQuizHistory = async (
  req,
  res
) => {

  try {

    const { studentId } =
      req.params;

    const results =
      await QuizResult.find({

        studentId,

      })

      .populate(
        "quizId",
        "title"
      )

      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      results,

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

const getStudentResults = async (
  req,
  res
) => {

  try {

    const results =
      await QuizResult.find({
        studentId: req.params.studentId,
      })
      .populate(
        "quizId",
        "title"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      results,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

const getTopStudentsLeaderboard =
async (req, res) => {

  try {

    const results =
      await QuizResult.find()
      .populate(
        "studentId",
        "name"
      );

    const leaderboardMap = {};

    results.forEach((item) => {

      const studentId =
        item.studentId._id.toString();

      if (
        !leaderboardMap[studentId]
      ) {

        leaderboardMap[studentId] = {

          name:
            item.studentId.name,

          totalScore: 0,

          totalMarks: 0,

          attempts: 0,

        };

      }

      leaderboardMap[
        studentId
      ].totalScore += item.score;

      leaderboardMap[
        studentId
      ].totalMarks += item.total;

      leaderboardMap[
        studentId
      ].attempts += 1;

    });

    const leaderboard =
      Object.values(
        leaderboardMap
      )

      .map((student) => ({

        ...student,

        average:
          (
            student.totalScore /
            student.totalMarks
          ) * 100,

      }))

      .sort(
        (a, b) =>
          b.average -
          a.average
      );

    res.json({

      success: true,

      leaderboard,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Leaderboard Error",

    });

  }

};

// =================================================
// QUIZ ANALYTICS
// =================================================

const getQuizAnalytics = async (
  req,
  res
) => {

  try {

    const totalQuizzes =
      await Quiz.countDocuments();

    const totalAttempts =
      await QuizResult.countDocuments();

    const results =
      await QuizResult.find();

    let averageScore = 0;

    if (results.length > 0) {

      const totalMarks =
        results.reduce(
          (sum, item) =>
            sum +
            (
              item.score /
              item.total
            ) *
            100,
          0
        );

      averageScore =
        (
          totalMarks /
          results.length
        ).toFixed(1);

    }

    const topQuiz =
      await Quiz.findOne();

    res.json({

    totalQuizzes,

    totalAttempts,

    averageScore,

    topQuiz:
      topQuiz?.title ||
      "No Quiz",

  });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Analytics Error",
    });

  }

};

const getQuizAttemptsChart =
async (req, res) => {

  try {

    const quizzes =
      await Quiz.find();

    const results =
      await QuizResult.find();

    const chartData =
      quizzes.map((quiz) => {

        const attempts =
          results.filter(
            (result) =>
              result.quizId.toString() ===
              quiz._id.toString()
          );

        return {

          quizName:
            quiz.title,

          attempts:
            attempts.length,

        };

      });

    res.json(chartData);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Chart Error",
    });

  }

};

const getLeaderboard = async (req, res) => {
  try {

    const results = await QuizResult.find()
      .populate("studentId", "name");

    const leaderboardMap = {};

    results.forEach((result) => {

      const studentName =
        result.studentId?.name || "Unknown";

      if (!leaderboardMap[studentName]) {

        leaderboardMap[studentName] = {
          name: studentName,
          totalScore: 0,
          totalMarks: 0,
          attempts: 0,
        };

      }

      leaderboardMap[studentName].totalScore += result.score;
      leaderboardMap[studentName].totalMarks += result.total;
      leaderboardMap[studentName].attempts += 1;

    });

    const leaderboard = Object.values(
      leaderboardMap
    ).map((student) => ({
      name: student.name,
      attempts: student.attempts,
      average:
        (student.totalScore /
          student.totalMarks) *
        100,
    }));

    leaderboard.sort(
      (a, b) => b.average - a.average
    );

    res.status(200).json({
      success: true,
      leaderboard,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
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
  getLeaderboard,
  getTopStudentsLeaderboard,

};