import { useState } from "react";
import axios from "axios";

function TeacherQuiz() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [quizData, setQuizData] =
    useState({
      title: "",
      description: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      difficulty: "Easy",
      marks: 1,
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setQuizData({
      ...quizData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {

        title:
          quizData.title,

        description:
          quizData.description,

        difficulty:
          quizData.difficulty,

        createdBy:
          user?._id,

        questions: [

          {

            question:
              quizData.question,

            options: [

              quizData.option1,

              quizData.option2,

              quizData.option3,

              quizData.option4,

            ],

            answer:
              quizData.answer,

            marks:
              quizData.marks,

          },

        ],

      };

      const res =
        await axios.post(
          "http://localhost:5000/api/quiz/create",
          payload
        );

      alert(res.data.message);

      setQuizData({
        title: "",
        description: "",
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        difficulty: "Easy",
        marks: 1,
      });

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
        "Failed to Create Quiz"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-6">

      {/* HEADER */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-purple-700">
          🤖 AI Quiz Generator
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Create smart quizzes for students 🚀
        </p>

      </div>

      {/* FORM */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={quizData.title}
            onChange={handleChange}
            className="w-full border p-4 rounded-2xl outline-none focus:border-purple-500"
            required
          />

          <textarea
            name="description"
            placeholder="Quiz Description"
            value={quizData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-4 rounded-2xl outline-none focus:border-purple-500"
          />

          <input
            type="text"
            name="question"
            placeholder="Enter Question"
            value={quizData.question}
            onChange={handleChange}
            className="w-full border p-4 rounded-2xl outline-none focus:border-purple-500"
            required
          />

          {/* OPTIONS */}

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="option1"
              placeholder="Option 1"
              value={quizData.option1}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
              required
            />

            <input
              type="text"
              name="option2"
              placeholder="Option 2"
              value={quizData.option2}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
              required
            />

            <input
              type="text"
              name="option3"
              placeholder="Option 3"
              value={quizData.option3}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
              required
            />

            <input
              type="text"
              name="option4"
              placeholder="Option 4"
              value={quizData.option4}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
              required
            />

          </div>

          {/* ANSWER */}

          <input
            type="text"
            name="answer"
            placeholder="Correct Answer"
            value={quizData.answer}
            onChange={handleChange}
            className="w-full border p-4 rounded-2xl"
            required
          />

          {/* DIFFICULTY + MARKS */}

          <div className="grid md:grid-cols-2 gap-5">

            <select
              name="difficulty"
              value={quizData.difficulty}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
            >

              <option value="Easy">
                Easy
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Hard">
                Hard
              </option>

            </select>

            <input
              type="number"
              name="marks"
              placeholder="Marks"
              value={quizData.marks}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
          >

            {loading
              ? "Creating Quiz..."
              : "Create Quiz"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default TeacherQuiz;