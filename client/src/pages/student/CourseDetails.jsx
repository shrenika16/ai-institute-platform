import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function CourseDetails() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [course, setCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchCourse();

  }, []);

  // =========================================
  // FETCH SINGLE COURSE
  // =========================================

  const fetchCourse = async () => {

    try {

      const res =
        await axios.get(

          `http://localhost:5000/api/courses/${id}`

        );

      setCourse(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // =========================================
  // ENROLL COURSE
  // =========================================

  const handleEnroll =
    async () => {

      // LOGIN CHECK

      if (!user) {

        alert(
          "Please login first"
        );

        navigate("/login");

        return;

      }

      try {

        await axios.post(

          "http://localhost:5000/api/enrollments/add",

          {

            studentId:
              user._id,

            courseId:
              course._id,

          }

        );

        alert(
          "Course Enrolled Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Enrollment Failed"
        );

      }

    };

  // =========================================

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 py-12 px-6">

      {course && (

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          {/* ========================================= */}
          {/* LEFT IMAGE */}
          {/* ========================================= */}

          <div>

            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />

          </div>

          {/* ========================================= */}
          {/* RIGHT CONTENT */}
          {/* ========================================= */}

          <div className="p-10">

            {/* CATEGORY */}

            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

              {course.category}

            </span>

            {/* TITLE */}

            <h1 className="text-4xl font-bold text-gray-800 mt-6">

              {course.title}

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 text-gray-600 leading-8">

              {course.description}

            </p>

            {/* COURSE INFO */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <span className="font-bold text-gray-700">

                  👨‍🏫 Instructor:

                </span>

                <span className="text-gray-600">

                  {course.instructor}

                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="font-bold text-gray-700">

                  ⏳ Duration:

                </span>

                <span className="text-gray-600">

                  {course.duration}

                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="font-bold text-gray-700">

                  📚 Level:

                </span>

                <span className="text-gray-600">

                  {course.level}

                </span>

              </div>

            </div>

            {/* PRICE */}

            <div className="mt-8">

              <h2 className="text-4xl font-bold text-blue-600">

                ₹ {course.price}

              </h2>

            </div>

            {/* BUTTON */}

            <button

                    onClick={() =>
                      navigate(`/student/course/${id}`)
                    }

                    className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"

                  >

                    Enroll Now

            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default CourseDetails;