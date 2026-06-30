const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.QuizResult ||
  mongoose.model(
    "QuizResult",
    quizResultSchema
  );