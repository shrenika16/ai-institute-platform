import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StudentAssignmentSubmit() {

  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [file, setFile] = useState(null);

  const [alreadySubmitted, setAlreadySubmitted] =
    useState(null);

  useEffect(() => {

    fetchSubmission();

  }, []);

  const fetchSubmission = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/submissions/student/${user._id}`
      );

      const found =
        res.data.submissions.find(
          (item) =>
            item.assignmentId?._id === id
        );

      setAlreadySubmitted(found);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async () => {

    if (!file) {

      alert("Please Upload PDF");

      return;

    }

    try {

      const formData = new FormData();

      formData.append(
        "assignmentId",
        id
      );

      formData.append(
        "studentId",
        user._id
      );

      formData.append(
        "file",
        file
      );

      let res;

      if (alreadySubmitted) {

        res = await axios.put(

          `http://localhost:5000/api/submissions/update/${alreadySubmitted._id}`,

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }

        );

      } else {

        res = await axios.post(

          "http://localhost:5000/api/submissions/submit",

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }

        );

      }

      if (res.data.success) {

        alert(res.data.message);

        setFile(null);

        fetchSubmission();

      }

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Submission Failed ❌"

      );

    }

  };

  return (

    <div className="p-8">

      <div className="bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-purple-600 mb-6">

          Assignment Submission

        </h1>

        {alreadySubmitted && (

          <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">

            ✅ You have already submitted this assignment.
            You can upload a new PDF to update it.

          </div>

        )}

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >

          {alreadySubmitted
            ? "Update Submission"
            : "Submit Assignment"}

        </button>

      </div>

    </div>

  );

}

export default StudentAssignmentSubmit;