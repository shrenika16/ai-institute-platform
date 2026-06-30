import { useEffect, useState } from "react";
import axios from "axios";

function StudentSubmissionStatus() {
  const [submissions, setSubmissions] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    if (user?._id) {
      fetchSubmissions();
    }
  }, []);

  const fetchSubmissions = async () => {

  try {

      const res = await axios.get(

        `http://localhost:5000/api/submissions/student/${user._id}`

      );

      setSubmissions(res.data.submissions);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-3xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold">
          📄 My Assignment Status
        </h1>

        <p className="mt-2 text-green-100">
          Track all your assignment submissions
        </p>
      </div>

      {/* EMPTY STATE */}
      {submissions.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-600">
            No Assignments Submitted Yet
          </h2>
        </div>
      ) : (
        submissions.map((item) => (

          <div
            key={item._id}
            className={`bg-white p-6 rounded-3xl shadow-lg mb-6 border-l-8
              ${
                item.status === "Approved"
                  ? "border-green-500"
                  : item.status === "Rejected"
                  ? "border-red-500"
                  : "border-yellow-500"
              }
            `}
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {item.assignmentId?.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  Assignment Submission
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-white font-semibold
                  ${
                    item.status === "Approved"
                      ? "bg-green-500"
                      : item.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }
                `}
              >
                {item.status}
              </span>

            </div>

            <div className="mt-5 space-y-2">

              <p>
                <strong>Marks:</strong>{" "}
                {item.marks}
              </p>

              <p>
                <strong>Teacher Feedback:</strong>{" "}
                {item.feedback || "No Feedback Yet"}
              </p>

              <p>
                <strong>PDF:</strong>{" "}

                {item.submissionPdf ? (

                  <a
                    href={item.submissionPdf}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Submitted PDF
                  </a>

                ) : (

                  "No PDF Uploaded"

                )}

              </p>

              <p className="text-gray-500">
                Submitted On:{" "}
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default StudentSubmissionStatus;