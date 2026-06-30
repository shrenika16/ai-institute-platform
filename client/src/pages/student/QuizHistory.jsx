import React, { useEffect, useState } from "react";
import axios from "axios";

function QuizHistory() {

  const [results, setResults] = useState([]);

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const res = await axios.get(
        `http://localhost:5000/api/quiz/student-results/${user._id}`
      );

      setResults(res.data.results);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        📊 Quiz History
      </h2>

      {results.length > 0 ? (

        results.map((item) => (

          <div
            key={item._id}
            className="bg-white shadow rounded-xl p-4 mb-4"
          >

            <h3 className="font-bold text-xl">
              {item.quizId?.title}
            </h3>

            <p>
              Score :
              {" "}
              {item.score}
              /
              {item.total}
            </p>

            <p>
              Attempted :
              {" "}
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

  );
}

export default QuizHistory;