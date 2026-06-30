import { useEffect, useState } from "react";
import axios from "axios";

function StudentQuiz() {

  const [quizzes, setQuizzes] =
    useState([]);

  const [selectedAnswers,
    setSelectedAnswers] =
    useState({});

  const [result, setResult] =
    useState(null);

  const [history,
    setHistory] =
    useState([]);
  
  // FETCH QUIZZES
  useEffect(() => {

    fetchQuizzes();

    fetchHistory();

  }, []);

  const fetchQuizzes =
    async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/quiz"
        );

        setQuizzes(res.data);

      } catch (error) {

        console.log(error);

      }

    };
  const fetchHistory =
async () => {

  try {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    const res =
      await axios.get(
        `http://localhost:5000/api/quiz/student-results/${user._id}`
      );

    setHistory(
      res.data.results
    );

  } catch (error) {

    console.log(error);

  }

};

  // SELECT ANSWER
  const handleOptionChange =
    (quizId, questionIndex, option) => {

      setSelectedAnswers({

        ...selectedAnswers,

        [quizId]: {

          ...selectedAnswers[quizId],

          [questionIndex]:
            option,

        },

      });

    };

  // SUBMIT QUIZ
  const handleSubmit =
    async (quizId) => {

      try {

        const answers =
          Object.values(
            selectedAnswers[quizId] || {}
          );

        const res =
          await axios.post(
            `http://localhost:5000/api/quiz/submit/${quizId}`,
            {
                answers,

                studentId:
                  JSON.parse(
                    localStorage.getItem("user")
                  )?._id,

            }
          );

        setResult({

          quizId,

          score: res.data.score,

          total: res.data.total,

        });
        fetchHistory();

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Quiz Submit Failed"
        );

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">

      {/* HEADER */}
      <div className="bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-blue-600">
          📝 Student Quiz System
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Attempt quizzes and test your knowledge.
        </p>

      </div>

      {/* QUIZZES */}
      <div className="mt-10 space-y-10">

        {quizzes.length > 0 ? (

          quizzes.map((quiz) => (

            <div
              key={quiz._id}
              className="bg-white p-8 rounded-3xl shadow-xl"
            >

              <h2 className="text-3xl font-bold text-purple-600">
                {quiz.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {quiz.description}
              </p>

              {/* QUESTIONS */}
              <div className="mt-8 space-y-8">

                {quiz.questions.map(
                  (q, index) => (

                    <div
                      key={index}
                      className="bg-gray-50 p-6 rounded-2xl"
                    >

                      <h3 className="text-xl font-bold text-gray-800">
                        Q{index + 1}.
                        {" "}
                        {q.question}
                      </h3>

                      <div className="mt-5 space-y-3">

                        {q.options.map(
                          (option, i) => (

                            <label
                              key={i}
                              className="flex items-center gap-3 bg-white p-4 rounded-xl border hover:border-blue-500 cursor-pointer"
                            >

                              <input
                                type="radio"
                                name={`${quiz._id}-${index}`}
                                value={option}
                                onChange={() =>
                                  handleOptionChange(
                                    quiz._id,
                                    index,
                                    option
                                  )
                                }
                              />

                              <span>
                                {option}
                              </span>

                            </label>

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* SUBMIT */}
              <button
                onClick={() =>
                  handleSubmit(
                    quiz._id
                  )
                }
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"
              >
                Submit Quiz
              </button>

              {/* RESULT */}
              {result?.quizId ===
                quiz._id && (

                <div className="mt-8 bg-green-100 border border-green-300 p-6 rounded-2xl">

                  <h3 className="text-2xl font-bold text-green-700">
                    🎉 Quiz Result
                  </h3>

                  <p className="mt-3 text-lg text-gray-700">

                    Score:
                    {" "}
                    <span className="font-bold text-green-600">
                      {result.score}
                    </span>

                    {" / "}

                    <span className="font-bold">
                      {result.total}
                    </span>

                  </p>

                </div>

              )}

            </div>

          ))

        ) : (

          <div className="bg-white p-10 rounded-3xl shadow text-center">

            <h2 className="text-2xl font-bold text-gray-600">
              No Quizzes Available
            </h2>

          </div>

        )}

      </div>

    </div>
    
  );
  <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">

  <h2 className="text-3xl font-bold text-purple-600 mb-6">

    📜 Quiz Result History

  </h2>

  {history.length > 0 ? (

    history.map((item) => (

      <div
        key={item._id}
        className="border-b py-4"
      >

        <h3 className="font-bold">

          {item.quizId?.title}

        </h3>

        <p>

          Score:
          {" "}
          {item.score}
          /
          {item.total}

        </p>

        <p className="text-sm text-gray-500">

          {new Date(
            item.createdAt
          ).toLocaleString()}

        </p>

      </div>

    ))

  ) : (

    <p>No Quiz Attempts Yet</p>

  )}

</div>
}

export default StudentQuiz;