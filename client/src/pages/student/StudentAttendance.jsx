import { useEffect, useState } from "react";

import axios from "axios";

function StudentAttendance() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [attendance,
    setAttendance] = useState([]);

  const [loading,
    setLoading] = useState(false);

  // FETCH ATTENDANCE
  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/attendance/${user._id}`
          );

        setAttendance(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // MARK ATTENDANCE
           // MARK ATTENDANCE
  const markAttendance =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.post(
            "http://localhost:5000/api/attendance/mark",
            {

              studentId:
                user._id,

              studentName:
                user.name,

              courseId:
                "MERN101",

              status:
                "Present",

              date: 
                new Date().toISOString().split("T")[0],

            }
          );

        alert(
          res.data.message
        );

        fetchAttendance();

      } catch (error) {

        alert(

          error.response?.data
            ?.message ||

          "Attendance Failed"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="p-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-green-600">
          Attendance Dashboard
        </h2>

        <p className="text-gray-500 mt-2">
          Mark and track your attendance
        </p>

        <button
          onClick={markAttendance}
          disabled={loading}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >

          {loading
            ? "Marking..."
            : "Mark Attendance"}

        </button>

      </div>

      {/* ATTENDANCE LIST */}
      <div className="mt-10">

        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Attendance History
        </h3>

        {attendance.length === 0 ? (

          <div className="bg-white p-8 rounded-3xl shadow text-center text-gray-500">

            No Attendance Found

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {attendance.map((item) => (

              <div
                key={item._id}
                className="bg-white p-6 rounded-3xl shadow-lg border-l-4 border-green-500"
              >

                <h4 className="text-xl font-bold text-green-600">

                  {item.status}

                </h4>

                <p className="text-gray-500 mt-2">
                  Course : {item.courseId}
                </p>

                <p className="text-gray-600 mt-3">
                  {new Date(item.date).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default StudentAttendance;