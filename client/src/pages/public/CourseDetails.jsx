import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );

      setCourse(res.data);
    } catch (error) {
      console.log("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Course Details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Course not found
      </div>
    );
  }
  const handleEnroll = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user) {

        toast.error(
          "Please Login First"
        );

        return;

      }

      await axios.post(

        `http://localhost:5000/api/courses/${course._id}/enroll`,

        {
          userId: user._id,
        }

      );

      toast.success(
        "Enrollment Successful"
      );

      fetchCourse();

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Enrollment Failed"

      );

    }

  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* TOP SECTION */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* VIDEO */}
        <div className="w-full">
          <iframe
            src={course.videoUrl}
            className="w-full h-[450px]"
            title="course video"
          ></iframe>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            {course.title}
          </h1>

          <p className="mt-4 text-gray-600 leading-7">
            {course.description}
          </p>

          {/* INFO */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-blue-100 p-4 rounded-xl text-center">
              <p className="text-gray-600">Duration</p>
              <p className="font-bold">{course.duration}</p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl text-center">
              <p className="text-gray-600">Level</p>
              <p className="font-bold">{course.level}</p>
            </div>

            <div className="bg-purple-100 p-4 rounded-xl text-center">
              <p className="text-gray-600">Price</p>
              <p className="font-bold">₹{course.price}</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl text-center">
              <p className="text-gray-600">Instructor</p>
              <p className="font-bold">{course.instructor}</p>
            </div>

            <div className="bg-red-100 p-4 rounded-xl text-center">
              <p className="text-gray-600">
                Students
              </p>

              <p className="font-bold">
                {
                  course.enrolledStudents?.length || 0
                }
              </p>
            </div>
            
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">

            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl"
            >
              Back to Courses
            </button>

            <button
                onClick={handleEnroll}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl"
              >
                Enroll Now
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default CourseDetails;