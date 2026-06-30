import { useEffect, useState } from "react";
import axios from "axios";

function TeacherSubmissions() {

const [submissions, setSubmissions] =
useState([]);

const [teacherRemarks, setTeacherRemarks] = useState({});
const [marks, setMarks] = useState({});

useEffect(() => {


fetchSubmissions();


}, []);

const fetchSubmissions =
async () => {


  try {

    const res =
      await axios.get(
        "http://localhost:5000/api/submissions"
      );

    setSubmissions(
      res.data.submissions
    );

  } catch (error) {

    console.log(error);

  }

};


const updateStatus =
async (id, status) => {


  try {

    await axios.put(
      `http://localhost:5000/api/submissions/${id}/status`,
      {
        status,
        feedback:
          teacherRemarks[id] || "",
           marks: marks[id] || 0,
      }
    );

    fetchSubmissions();

  } catch (error) {

    console.log(error);

  }

};


return (


<div className="p-8 bg-gray-100 min-h-screen">

  <h1 className="text-4xl font-bold text-purple-600 mb-8">
    Assignment Submissions
  </h1>

  <div className="grid md:grid-cols-2 gap-6">

    {submissions.map((item) => (

      <div
        key={item._id}
        className="
        bg-white
        p-6
        rounded-3xl
        shadow-lg
        border
        border-gray-200
        hover:shadow-2xl
        transition
        "
      >

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold text-purple-600">
            {item.assignmentId?.title}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-white text-sm

            ${
              item.status === "Approved"
                ? "bg-green-500"
                : item.status === "Rejected"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {item.status}
          </span>

        </div>

        <div className="space-y-2">

          <p>
            👤 <strong>Student:</strong>{" "}
            {item.studentId?.name}
          </p>

          <p>
            📧 <strong>Email:</strong>{" "}
            {item.studentId?.email}
          </p>

          
        </div>

        <div className="flex gap-3 mt-5 flex-wrap">

          {item.submissionPdf && (

              <a
              href={item.submissionPdf}
              target="_blank"
              rel="noreferrer"
              className="
              bg-purple-500
              text-white
              px-4
              py-2
              rounded-xl
              "
              >

              📄 View PDF

              </a>

              )}

        </div>
              <div className="mt-4">

            <label className="block font-semibold mb-2">
              Marks
            </label>

            <input
              type="number"
              placeholder="Enter Marks"
              value={marks[item._id] || ""}
              onChange={(e) =>
                setMarks({
                  ...marks,
                  [item._id]: e.target.value,
                })
              }
              className="w-full border p-3 rounded-xl"
            />

          </div>
        <div className="mt-4">

              <label className="block font-semibold mb-2">
                Teacher Remarks
              </label>

              <textarea
                placeholder="Enter remarks..."
                value={teacherRemarks[item._id] || ""}
                onChange={(e) =>
                  setTeacherRemarks({
                    ...teacherRemarks,
                    [item._id]: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

            </div>

        <div className="mt-5 flex gap-3">

          <button
            onClick={() =>
              updateStatus(
                item._id,
                "Approved"
              )
            }
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-2
            rounded-xl
            font-semibold
            "
          >
            ✅ Approve
          </button>

          <button
            onClick={() =>
              updateStatus(
                item._id,
                "Rejected"
              )
            }
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-5
            py-2
            rounded-xl
            font-semibold
            "
          >
            ❌ Reject
          </button>

        </div>

      </div>

    ))}

  </div>

</div>


);

}

export default TeacherSubmissions;