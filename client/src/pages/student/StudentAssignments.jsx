import { useEffect, useState } from "react";
import axios from "axios";
import {
  useNavigate
} from "react-router-dom";

function StudentAssignments() {

  const navigate = useNavigate();
  const [assignments, setAssignments] =
    useState([]);

  // FETCH ASSIGNMENTS
  useEffect(() => {

    fetchAssignments();

  }, []);

  const fetchAssignments =
    async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/assignments"
        );

        setAssignments(
          res.data.assignments
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="mt-10">

      {/* HEADER */}
      <div className="bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-purple-600">
          📄 Student Assignments
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Complete your pending tasks before deadline.
        </p>

      </div>

      {/* ASSIGNMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

        {assignments.length > 0 ? (

          assignments.map((item) => (

            <div
              key={item._id}
              className="bg-white p-6 rounded-3xl shadow-lg border-l-4 border-purple-500"
            >

              <h2 className="text-2xl font-bold text-purple-600">
                {item.title}
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>

              <div className="mt-6 flex justify-between items-center">

                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-xl text-sm">
                  Due Date:
                  {" "}
                  {new Date(
                      item.dueDate
                    ).toLocaleDateString()}
                </span>

                <button
                    onClick={() =>
                      navigate(
                        `/student/assignment-submit/${item._id}`
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"
                  >
                    Submit
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="bg-white p-10 rounded-3xl shadow text-center">

            <h2 className="text-2xl font-bold text-gray-600">
              No Assignments Available
            </h2>

          </div>

        )}

      </div>

    </div>

  );
}

export default StudentAssignments;