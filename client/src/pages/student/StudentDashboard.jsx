import { useEffect, useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import NotificationBell from "../../components/NotificationBell";

function StudentDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const navigate = useNavigate();

  const location = useLocation();

  const [courses, setCourses] = useState([]);

  const [search, setSearch] =
    useState("");

  const [enrolledCourses, setEnrolledCourses] =
    useState([]);

  const [userData, setUserData] =
  useState(null);

  const [selectedImage, setSelectedImage] =
  useState(null);

  const [loading, setLoading] =
    useState(false);

  const [
    studentAttendance,
    setStudentAttendance
  ] = useState([]);


  const [dashboard, setDashboard] = useState({
    totalCourses: 0,
    completedCourses: 0,
    attendancePercentage: 0,
    pendingAssignments: 0,
    quizzes: 0,
  });

  // FETCH DATA
  useEffect(() => {

    if (user?._id) {

      fetchCourses();

      fetchEnrollments();

      fetchUserData();

      fetchStudentAttendance();

      fetchDashboard();
    }

  }, []);

  // FETCH COURSES
  const fetchCourses = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/courses"
      );

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // FETCH ENROLLMENTS
  const fetchEnrollments = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/enrollments/${user._id}`
      );

      setEnrolledCourses(res.data);

      console.log(
        "Enrolled Courses API:",
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

 const fetchUserData = async () => {

  try {

    const res = await axios.get(
      `http://localhost:5000/api/users/${user._id}`
    );

    console.log("USER API RESPONSE:", res.data);

    setUserData(res.data);

  } catch (error) {

    console.log(error);

  }

};
const fetchStudentAttendance =
  async () => {

    try {

      const studentId =
        user?._id;

      const res =
        await axios.get(

`http://localhost:5000/api/attendance/${studentId}`

        );

      setStudentAttendance(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const fetchDashboard = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/dashboard/student/${user._id}`
    );

    console.log(res.data);

    setDashboard(res.data);

  } catch (error) {
    console.log(error);
  }
};
const handleProfileImageUpload =
async () => {

  try {

    const formData =
      new FormData();

    formData.append(
      "profileImage",
      selectedImage
    );

    const res =
      await axios.put(

        `http://localhost:5000/api/users/${user._id}`,

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }

      );

    alert(
      "Profile Image Updated Successfully ✅"
    );

    fetchUserData();

  } catch (error) {

    console.log(error);

  }

};
  // ENROLL COURSE
  const handleEnroll = async (courseId) => {

    try {

      await axios.post(
        "http://localhost:5000/api/enrollments/enroll",
        {
          studentId: user._id,
          courseId,
        }
      );

      alert("Course Enrolled Successfully ✅");

      fetchEnrollments();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Enrollment Failed"
      );

    }

  };

  // CHECK ENROLLMENT
  const isEnrolled = (id) => {

    return enrolledCourses.some(
      (item) => item?.courseId?._id === id
    );

  };

    const getCourseProgress = (courseId) => {

    console.log("Course ID:", courseId);
    console.log("User Data:", userData);
    console.log(
      "Enrolled Courses:",
      userData?.enrolledCourses
    );

    const enrolledCourse =
      userData?.enrolledCourses?.find(
        (course) =>
          course.courseId?.toString() ===
          courseId?.toString()
      );

    console.log("Matched Course:", enrolledCourse);

    console.log(
      "Progress Value:",
      enrolledCourse?.progress
    );

    return enrolledCourse?.progress || 0;
  };

  // FILTER COURSES
  const filteredCourses =
    courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // SIDEBAR MENU
  const menu = [
    {
      label: "🏠 Dashboard",
      path: "/student/dashboard",
    },

    {
      label: "📝 Assignments",
      path:
        "/student/dashboard/assignments",
    },

    {
      label: "📄 My Submissions",
      path: "/student/submission-status",
    },

    {
      label: "📅 Attendance",
      path:
        "/student/dashboard/attendance",
    },

    {
      label:
        "📅 Attendance History",

      path:
        "/student/attendance-history",
    },

    {
      label: "🧪 Quiz / Test",
      path:
        "/student/dashboard/quiz",
    },

    {
      label: "📊 Quiz History",
      path: "/student/dashboard/quiz-history",
    },
    
    {
      label: "🤖 AI Assistant",
      path:
        "/student/dashboard/ai",
    },

    {
      label: "👤 My Profile",
      path:
        "/student/profile",
    },
  ];

  // ACTIVE MENU
  const isActive = (path) => {

    return location.pathname === path;

  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };
  console.log("userData state:", userData);

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">

      {/* SIDEBAR */}
      <div className="w-72 bg-white shadow-2xl p-6 flex flex-col justify-between border-r">

        <div>

          <div className="mb-10">

            <h1 className="text-3xl font-extrabold text-blue-600">
              🎓 Student Panel
            </h1>

            <p className="text-gray-500 mt-2">
              Smart Learning Dashboard
            </p>

          </div>

          <div className="space-y-3">

            {menu.map((item, index) => (

              <button
                key={index}
                onClick={() =>
                  navigate(item.path)
                }
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-blue-100 text-gray-700"
                }`}
              >

                {item.label}

              </button>

            ))}
            
          </div>

        </div>

        {/* USER CARD */}
        <div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-5 rounded-3xl mb-4 shadow-lg">

            <div className="flex items-center gap-4">

              <div>

                  <img
                    src={
                      userData?.profileImage ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border"
                  />

                </div>

              <div>

                <p className="text-sm text-gray-500">
                  Logged in as
                </p>

                <h2 className="text-xl font-bold text-blue-700">
                  {user?.name}
                </h2>

                <p className="text-sm text-gray-600">
                  Student
                </p>

              </div>

            </div>

          </div>
          
          <div className="mt-4">

                      <input
                        type="file"
                        onChange={(e) =>
                          setSelectedImage(
                            e.target.files[0]
                          )
                        }
                      />

                      <button
                        onClick={
                          handleProfileImageUpload
                        }
                        className="w-full mt-2 bg-blue-600 text-white py-2 rounded-xl"
                      >

                        Upload Photo

                      </button>

                    </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg"
          >

            Logout

          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl shadow-xl mb-8">

          <div className="flex justify-between items-start">

            <div>
              <h1 className="text-4xl font-bold">
                Welcome back, {user?.name} 👋
              </h1>

              <p className="mt-3 text-lg">
                Continue your smart learning journey 🚀
              </p>
            </div>

            <NotificationBell userId={user._id} />

          </div>
          <div className="flex gap-6 mt-6">

            <div className="bg-white/20 px-6 py-4 rounded-2xl">
             <h2 className="text-2xl font-bold">
              {dashboard.totalCourses}
            </h2>

              <p>Total Courses</p>
            </div>

            <div className="bg-white/20 px-6 py-4 rounded-2xl">
              <h2 className="text-2xl font-bold">
                {dashboard.completedCourses}
              </h2>

              <p>Completed</p>
            </div>

          </div>

        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">

          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-white p-4 rounded-2xl shadow-lg outline-none border focus:border-blue-500"
          />
          <div className="grid md:grid-cols-5 gap-5 mb-8">

              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-3xl font-bold text-blue-600">
                  {dashboard.totalCourses}
                </h2>
                <p>Total Courses</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-3xl font-bold text-green-600">
                  {dashboard.completedCourses}
                </h2>
                <p>Completed</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-3xl font-bold text-purple-600">
                  {dashboard.attendancePercentage}%
                </h2>
                <p>Attendance</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-3xl font-bold text-red-600">
                  {dashboard.pendingAssignments}
                </h2>
                <p>Pending Assignments</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-3xl font-bold text-orange-600">
                  {dashboard.quizzes}
                </h2>
                <p>Quizzes</p>
              </div>

            </div>
        </div>

        {/* COURSES */}
        {location.pathname ===
          "/student/dashboard" && (

          <>
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
                My Courses
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {enrolledCourses.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white p-6 rounded-3xl shadow-lg"
                  >

                    <h2 className="text-2xl font-bold text-purple-600">
                      {item.courseId?.title}
                    </h2>

                    <p className="text-gray-600 mt-3">
                      {item.courseId?.description}
                    </p>

                    <button
                      onClick={() =>
                        navigate(
                          `/student/course/${item.courseId?._id}`
                        )
                      }
                      className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
                    >

                      Continue Learning

                    </button>
                      <div className="mt-4">

                          <div className="flex justify-between text-sm mb-2">

                            <span>Progress</span>

                            <span>
                              {getCourseProgress(
                                item.courseId?._id
                              )}%
                            </span>

                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-3">

                            <div
                              className="bg-green-600 h-3 rounded-full"
                              style={{
                                width: `${getCourseProgress(
                                  item.courseId?._id
                                )}%`,
                              }}
                            ></div>

                           </div>
                                {getCourseProgress(item.courseId?._id) === 100 && (

                                <>
                                  
                                  <div className="mt-3 bg-green-100 text-green-700 px-3 py-2 rounded-xl text-center font-semibold">

                                    🎓 Course Completed

                                  </div>

                                  <button
                                      onClick={() =>
                                        navigate(
                                          `/student/certificate/${item.courseId?._id}`
                                        )
                                      }
                                      className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                                    >
                                      📜 Download Certificate
                                  </button>

                                </>

                            )}
                        </div>
                    </div>

                ))}

              </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Available Courses
            </h2>

            {loading ? (

              <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

                <h2 className="text-2xl font-bold text-blue-600">
                  Loading Courses...
                </h2>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {filteredCourses.map((course) => (

                  <div
                    key={course._id}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >

                    {/* IMAGE */}
                    <img
                      src={
                        course.image ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                      }
                      alt={course.title}
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-6">

                      <div className="flex justify-between items-start">

                        <h2 className="text-2xl font-bold text-blue-600">
                          {course.title}
                        </h2>

                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-xl text-sm">
                          {course.duration}
                        </span>

                      </div>

                      <p className="text-gray-600 mt-4 leading-7 min-h-[90px]">
                        {course.description}
                      </p>

                      {/* PROGRESS */}
                      <div className="mt-5">

                        <div className="flex justify-between mb-2 text-sm">

                          <span className="text-gray-600">
                            Progress
                          </span>

                          <span className="text-purple-600 font-semibold">
                            {getCourseProgress(course._id)}%
                          </span>

                        </div>

                        <div className="w-full bg-gray-200 h-3 rounded-full">

                          <div
                                className="bg-purple-600 h-3 rounded-full"
                                style={{
                                  width: `${getCourseProgress(course._id)}%`,
                                }}
                          ></div>

                        </div>

                      </div>

                      {/* PRICE */}
                      <div className="mt-6">

                        <span className="text-green-600 font-bold text-2xl">
                          ₹ {course.price}
                        </span>

                      </div>

                      {/* BUTTONS */}
                      {isEnrolled(course._id) ? (

                        <div className="space-y-3 mt-6">

                          <button
                            disabled
                            className="w-full bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"
                          >

                            Already Enrolled

                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/student/course/${course._id}`
                              )
                            }
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition"
                          >

                            Start Learning

                          </button>

                        </div>

                      ) : (

                        <button
                          onClick={() =>
                            handleEnroll(course._id)
                          }
                          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                        >

                          Enroll Now

                        </button>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </>

        )}

        <Outlet />

      </div>

    </div>

  );

}

export default StudentDashboard;