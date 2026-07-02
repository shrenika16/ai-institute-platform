import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Bell } from "lucide-react";
function TeacherDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // ================= STATES =================

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [courses, setCourses] =
    useState([]);

  const [assignments, setAssignments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editId, setEditId] =
    useState(null);
  
  const [assignmentEditId, setAssignmentEditId] =
  useState(null);

  const [notifications, setNotifications] =
  useState([]);

  const [quizzes, setQuizzes] = useState([]);
  const [quizTopic, setQuizTopic] = useState("");
  const [generatedQuiz, setGeneratedQuiz] = useState([]);
  const [generatedQuizText, setGeneratedQuizText] =
  useState("");
  const [quizResults, setQuizResults] =
  useState([]);
  const [bestStudent,setBestStudent] =
    useState(null);

  const generateQuiz = async () => {

      if (!quizTopic) {

        alert("Enter Quiz Topic");

        return;

      }

      try {

        const res = await axios.post(
          "http://localhost:5000/api/ai/chat",
          {
            prompt: `
                Generate ONLY ONE MCQ question on ${quizTopic}

                Format exactly:

                Question: <question>

                A) <option>

                B) <option>

                C) <option>

                D) <option>

                Answer: <correct option letter>
                `
              }
            );

        setGeneratedQuizText(
            res.data.response
          );

          const text = res.data.response;

          const questionMatch =
            text.match(
              /Question:(.*?)A\)/s
            );

          const options =
            text.match(
              /A\)(.*?)B\)(.*?)C\)(.*?)D\)(.*?)Answer:/s
            );

          const answerMatch =
            text.match(
              /Answer:\s*(.*)/s
            );

          if (
            questionMatch &&
            options &&
            answerMatch
          ) {

            setQuizData({

              title:
                `${quizTopic} Quiz`,

              question:
                questionMatch[1].trim(),

              option1:
                options[1].trim(),

              option2:
                options[2].trim(),

              option3:
                options[3].trim(),

              option4:
                options[4].trim(),

              answer:
                answerMatch[1]
                  .trim()
                  .charAt(0),

            });

          }

      } catch (error) {

        console.log(error);

        alert("AI Error");

      }

    };
  const [
  quizAnalytics,
  setQuizAnalytics,
  ] = useState({

    totalQuizzes: 0,

    totalAttempts: 0,

    averageScore: 0,

    topQuiz: "",

  });
  const [
  attemptsChart,
  setAttemptsChart,
] = useState([]);
const [userData, setUserData] = useState(null);

const [selectedImage, setSelectedImage] = useState(null);
const [topStudents, setTopStudents] =
  useState([]);
  // ================= COURSE DATA =================

const [courseData, setCourseData] = useState({
  title: "",
  description: "",
  duration: "",
  price: "",
  thumbnail: "",
  instructor: "",
  category: "",
  level: "Beginner",

  lessons: [
    {
      title: "",
      videoUrl: "",
    },
  ],
});

  // ================= ASSIGNMENT DATA =================

  const [assignmentData, setAssignmentData] =
    useState({
      title: "",
      description: "",
      dueDate: "",
    });

    const [pdfFile, setPdfFile] = useState(null);

  // ================= QUIZ DATA =================

  const [quizData, setQuizData] =
    useState({
      title: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    });

    // ================= ATTENDANCE =================

    const [attendanceData,
      setAttendanceData] =
      useState({

        studentId: "",

        studentName: "",

        courseId: "",

        status: "Present",

        date: "",
      });

    const [attendanceList,
      setAttendanceList] =
      useState([]);
    
    const [attendanceEditId,
      setAttendanceEditId] =
      useState(null);
    
    const [attendanceAnalytics,
      setAttendanceAnalytics] =
      useState([]);
    
    const [attendanceHistory,
      setAttendanceHistory] =
      useState([]);
    const [attendanceChart,
      setAttendanceChart] =
      useState({

        present: 0,
        absent: 0,

      });
   const [analytics, setAnalytics] =
    useState({

      totalStudents: 0,

      attendanceRate: 0,

      completionRate: 0,

      totalAssignments: 0,

      totalSubmissions: 0,

      approvedSubmissions: 0,

      pendingSubmissions: 0,

      rejectedSubmissions: 0,

      submissionRate: 0,

      courseAnalytics: [],

      monthlyAnalytics: [],

      topCourse: null,

      recentActivities: [],

    });
      
      console.log("Analytics =", analytics);
      console.log("Monthly =", analytics.monthlyAnalytics);
    // ================= FETCH COURSES =================

    useEffect(() => {

    fetchCourses();

    fetchAssignments();

    fetchAttendance();

    fetchAttendanceAnalytics();

    fetchAttendanceChart();

    fetchAttendanceHistory(
      "6a0d721af4ccfa49d04c2028"
    );

    fetchUserData();

    fetchAnalytics();

    fetchQuizzes();

    fetchNotifications();
    
    fetchQuizAnalytics();

    fetchAttemptsChart();

    fetchLeaderboard();

    fetchQuizResults();

  }, []);

  const fetchAnalytics = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/analytics/teacher"
    );

    console.log("API DATA =", res.data);

    console.log("Latest Course =", res.data.latestCourse);
    console.log("Latest Assignment =", res.data.latestAssignment);
    console.log("Latest Attendance =", res.data.latestAttendance);
    console.log("Latest Submission =", res.data.latestSubmission);

    setAnalytics(res.data);

  } catch (error) {
    console.log(error);
  }
};
  // ================= FETCH ASSIGNMENTS =================

const fetchAssignments = async () => {

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
// ================= FETCH ATTENDANCE =================

const fetchAttendance =
  async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/attendance"
      );

      setAttendanceList(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };
  
  const fetchAttendanceAnalytics =
async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/attendance/analytics"
    );

    setAttendanceAnalytics(
      res.data
    );

    console.log(
    "Attendance Analytics =",
    attendanceAnalytics
    );

  } catch (error) {

    console.log(error);

  }

};
const fetchAttendanceChart =
  async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/attendance/chart"
        );

      setAttendanceChart(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };
const fetchAttendanceHistory =
  async (studentId) => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/attendance/history/${studentId}`
      );

      setAttendanceHistory(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

const fetchCourses = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/courses"
      );

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    }

  };
  const fetchQuizzes = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/quiz"
    );

    console.log("QUIZZES =", res.data);

    setQuizzes(res.data);

  } catch (error) {

    console.log(error);

  }

};
  
const fetchAttemptsChart =
async () => {

  try {

    const res =
      await axios.get(
        "http://localhost:5000/api/quiz/attempts-chart"
      );

    console.log(
      "ATTEMPTS CHART =",
      res.data
    );

    setAttemptsChart(
      res.data
    );

  } catch (error) {

    console.log(error);

  }

};
const fetchLeaderboard = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/quiz/leaderboard"
    );

    console.log(
      "Leaderboard Data =",
      res.data
    );

    setTopStudents(
      res.data.leaderboard
    );

    setBestStudent(
      res.data.leaderboard[0]
    );

  } catch (error) {

    console.log(error);

  }
};
const fetchQuizResults = async () => {

  try {

    const res =
      await axios.get(
        "http://localhost:5000/api/quiz/results"
      );

    console.log(
      "Quiz Results API =",
      res.data
    );

    setQuizResults(
      res.data.results
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

    setUserData(res.data);

  } catch (error) {

    console.log(error);

  }

};
const fetchQuizAnalytics = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/quiz/analytics"
    );

    console.log(
      "QUIZ ANALYTICS =",
      res.data
    );

    setQuizAnalytics(
      res.data
    );

  } catch (error) {

    console.log(error);

  }

};
const fetchNotifications = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/notifications"
    );

    console.log("Notifications =", res.data);

    setNotifications(res.data);

  } catch (error) {

    console.log(error);

  }
};

  // ================= HANDLE INPUT =================

  const handleCourseChange = (e) => {

    setCourseData({
      ...courseData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleAssignmentChange = (
    e
  ) => {

    setAssignmentData({
      ...assignmentData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleQuizChange = (e) => {

    setQuizData({
      ...quizData,
      [e.target.name]:
        e.target.value,
    });

  };

  const markAsRead = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/notifications/read/${id}`
      );

      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ================= COURSE SUBMIT =================

  const handleCourseSubmit = async (
  e
) => {

  e.preventDefault();

  try {

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      "title",
      courseData.title
    );

    formData.append(
      "description",
      courseData.description
    );

    formData.append(
      "duration",
      courseData.duration
    );

    formData.append(
      "price",
      courseData.price
    );

    formData.append(
      "thumbnail",
      courseData.thumbnail
    );

    formData.append(
      "instructor",
      courseData.instructor
    );

    formData.append(
      "category",
      courseData.category
    );

    formData.append(
      "level",
      courseData.level
    );

    formData.append(
      "lessons",
      JSON.stringify(courseData.lessons)
    );

    if (editId) {

            await axios.put(
              `http://localhost:5000/api/courses/${editId}`,
              formData,
              {
                headers: {
                  "Content-Type":
                    "multipart/form-data",
                },
              }
            );

            alert("Course Updated");

          } else {

            await axios.post(
              "http://localhost:5000/api/courses/add",
              formData,
              {
                headers: {
                  "Content-Type":
                    "multipart/form-data",
                },
              }
            );

            alert("Course Added");

          }
          await axios.post(
            "http://localhost:5000/api/notifications/create",
            {
              title: "New Course Added",
              message: courseData.title,
            }
          );
          
    alert("Course Added");

    fetchCourses();

    resetCourseForm();

  } catch (error) {

    console.log(error);

    alert("Upload Failed");

  } finally {

    setLoading(false);

  }

};

const addLesson = () => {
  setCourseData({
    ...courseData,
    lessons: [
      ...courseData.lessons,
      {
        title: "",
        videoUrl: "",
      },
    ],
  });
};

const removeLesson = (index) => {
  const updated = [...courseData.lessons];
  updated.splice(index, 1);

  setCourseData({
    ...courseData,
    lessons: updated,
  });
};

const handleLessonChange = (
  index,
  field,
  value
) => {

  const updated = [...courseData.lessons];

  updated[index][field] = value;

  setCourseData({
    ...courseData,
    lessons: updated,
  });

};

const handleProfileImageUpload =
async () => {

  try {

    const formData = new FormData();

    formData.append(
      "profileImage",
      selectedImage
    );

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
  // ================= RESET COURSE FORM =================

  const resetCourseForm = () => {

    setCourseData({
      title: "",
      description: "",
      duration: "",
      price: "",
      thumbnail: "",
      instructor: "",
      category: "",
      level: "Beginner",
    });

    setEditId(null);

  };

  // ================= DELETE COURSE =================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are You Sure Want To Delete?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/courses/${id}`
      );

      fetchCourses();

      alert("Course Deleted");

    } catch (error) {

      alert("Delete Failed");

    }

  };

// ================= EDIT COURSE =================

const handleEdit = (course) => {

  setCourseData({
    title: course.title,
    description: course.description,
    duration: course.duration,
    price: course.price,
    thumbnail: course.thumbnail || "",
    instructor: course.instructor || "",
    category: course.category || "",
    level: course.level || "Beginner",

    lessons:
      course.lessons?.length > 0
        ? course.lessons
        : [
            {
              title: "",
              videoUrl: "",
            },
          ],
  });

  setEditId(course._id);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

};

  // ================= ASSIGNMENT SUBMIT =================

  const handleAssignmentSubmit =
  async (e) => {

    e.preventDefault();

    // VALIDATION

    if (
      !assignmentData.title ||
      !assignmentData.description ||
      !assignmentData.dueDate
    ) {

      return alert(
        "Please Fill All Fields"
      );

    }

    try {

      setLoading(true);

      // API CALL

      let res;

          if (assignmentEditId) {

            res = await axios.put(
              `http://localhost:5000/api/assignments/${assignmentEditId}`,
              {

                title:
                  assignmentData.title,

                description:
                  assignmentData.description,

                dueDate:
                  assignmentData.dueDate,

              }
            );

          } else {

           const formData = new FormData();

            formData.append("title", assignmentData.title);
            formData.append("description", assignmentData.description);
            formData.append("dueDate", assignmentData.dueDate);
            formData.append("teacherId", user?._id);
            formData.append("courseId", "6a185d9dee3c2373668aff97");

            if (pdfFile) {
              formData.append("assignmentPdf", pdfFile);
            }

            console.log(pdfFile);

            for (let pair of formData.entries()) {
              console.log(pair[0], pair[1]);
            }

            res = await axios.post(
              "http://localhost:5000/api/assignments/create",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }

      // SUCCESS

      alert(
        res.data.message
      );
      setPdfFile(null);
      fetchAssignments();


      // RESET FORM

      setAssignmentData({

        title: "",

        description: "",

        dueDate: "",

      });

      setAssignmentEditId(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
        "Failed To Create Assignment"
      );

    } finally {

      setLoading(false);

    }

  };
  // ================= DELETE ASSIGNMENT =================

  const handleDeleteAssignment =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are You Sure Want To Delete Assignment?"
        );

      if (!confirmDelete) return;

      try {

        await axios.delete(
          `http://localhost:5000/api/assignments/${id}`
        );

        alert(
          "Assignment Deleted Successfully"
        );

        fetchAssignments();

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed"
        );

      }

    };

    // ================= EDIT ASSIGNMENT =================

    const handleEditAssignment = (
      assignment
    ) => {

      setAssignmentData({

        title: assignment.title,

        description:
          assignment.description,

        dueDate:
          assignment.dueDate
            ?.split("T")[0],

      });

      setAssignmentEditId(
        assignment._id
      );

      window.scrollTo({

        top: 0,

        behavior: "smooth",

      });

    };
  // ================= QUIZ SUBMIT =================

  const handleQuizSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const quizPayload = {

        title:
          quizData.title,

        description:
          "AI Generated Quiz",

        createdBy:
          user?._id,

        questions: [

          {

            question:
              quizData.question,

            options: [

              quizData.option1,

              quizData.option2,

              quizData.option3,

              quizData.option4,

            ],

            answer:
              quizData.answer,

          },

        ],

      };

      const res =
        await axios.post(
          "http://localhost:5000/api/quiz/create",
          quizPayload
        );

      alert(
        res.data.message
      );

      // RESET FORM

      setQuizData({

        title: "",

        question: "",

        option1: "",

        option2: "",

        option3: "",

        option4: "",

        answer: "",

      });

    } catch (error) {

      console.log(error);

      alert(
        "Quiz Creation Failed"
      );

    }

  };
  const deleteQuiz = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/quiz/${id}`
      );

      fetchQuizzes();

    } catch (error) {

      console.log(error);

    }

  };
  // ================= HANDLE ATTENDANCE INPUT =================

const handleAttendanceChange =
  (e) => {

    setAttendanceData({

      ...attendanceData,

      [e.target.name]:
        e.target.value,

    });

  };


// ================= MARK ATTENDANCE =================

const handleAttendanceSubmit =
  async (e) => {

    e.preventDefault();

    try {

      let res;

      // UPDATE
      if (attendanceEditId) {

        res = await axios.put(
          `http://localhost:5000/api/attendance/${attendanceEditId}`,
          attendanceData
        );

      }

      // CREATE
      else {

        res = await axios.post(
          "http://localhost:5000/api/attendance/mark",
          attendanceData
        );

      }

      alert(res.data.message);

      fetchAttendance();

      setAttendanceData({

        studentId: "",

        studentName: "",

        courseId: "",

        status: "Present",

        date: "",

      });

      setAttendanceEditId(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Attendance Failed"
      );

    }

  };
  // ================= EDIT ATTENDANCE =================

    const handleEditAttendance = (item) => {

      setAttendanceData({

        studentId: item.studentId,

        studentName: item.studentName,

        courseId: item.courseId,

        status: item.status,

        date: item.date?.split("T")[0],

      });

      setAttendanceEditId(item._id);

    };


    // ================= DELETE ATTENDANCE =================

    const handleDeleteAttendance = async (id) => {

      const confirmDelete =
        window.confirm(
          "Are You Sure Want To Delete Attendance?"
        );

      if (!confirmDelete) return;

      try {

        await axios.delete(
          `http://localhost:5000/api/attendance/${id}`
        );

        alert("Attendance Deleted");

        fetchAttendance();

      } catch (error) {

        console.log(error);

        alert("Delete Failed");

      }

    };
  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/login");

  };
const analyticsChartData = [

  {
    name: "Attendance",
    value: Number(
      analytics.attendanceRate
    ),
  },

  {
    name: "Completion",
    value: Number(
      analytics.completionRate
    ),
  },

];

const completionPieData = [
  {
    name: "Completed",
    value: Number(
      analytics.completionRate || 0
    ),
  },

  {
    name: "Remaining",
    value:
      100 -
      Number(
        analytics.completionRate || 0
      ),
  },
];

const courseChartData =
  analytics.courseAnalytics || [];
console.log(
  analytics.courseAnalytics
);

const pieData = [
  {
    name: "Approved",
    value: analytics?.approvedSubmissions || 0,
  },
  {
    name: "Pending",
    value: analytics?.pendingSubmissions || 0,
  },
  {
    name: "Rejected",
    value: analytics?.rejectedSubmissions || 0,
  },
];

const COLORS = [
  "#00C49F",
  "#FFBB28",
  "#FF4444",
];
console.log("Notifications State =", notifications);
  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}

      <div className="w-72 bg-white shadow-2xl p-6 flex flex-col justify-between">

        <div>

          <div className="mb-10">

            <h1 className="text-3xl font-bold text-green-600">
              🎓 Teacher Panel
            </h1>

            <p className="text-gray-500 mt-2">
              Smart LMS Dashboard
            </p>

          </div>

          <div className="space-y-4">

            <button
              onClick={() =>
                setActiveTab("dashboard")
              }
              className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition ${
                activeTab === "dashboard"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              📊 Dashboard
            </button>

            <button
              onClick={() =>
                setActiveTab("courses")
              }
              className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition ${
                activeTab === "courses"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              📚 Course Management
            </button>

            <button
              onClick={() =>
                setActiveTab("assignments")
              }
              className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition ${
                activeTab === "assignments"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              📝 Assignment Management
            </button>

            <button
              onClick={() =>
                setActiveTab("quiz")
              }
              className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition ${
                activeTab === "quiz"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              🤖 AI Quiz Generator
            </button>
            <button
                onClick={() =>
                  setActiveTab("attendance")
                }
                className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition ${
                  activeTab === "attendance"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-green-100"
                }`}
              >
                📅 Attendance
            </button>
            <button
              onClick={() =>
                setActiveTab("analytics")
              }
              className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition ${
                activeTab === "analytics"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              📈 Student Analytics
            </button>

            <button
              onClick={() =>
                navigate("/teacher/profile")
              }
              className="w-full text-left px-5 py-4 rounded-2xl font-semibold bg-gray-100 hover:bg-green-100"
            >
              👤 My Profile
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition ${
                activeTab === "notifications"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              🔔 Notifications
            </button>
                        
          </div>
              <div className="mt-6">
              <button
                onClick={() =>
                  navigate("/teacher/submissions")
                }
                className="
                w-full
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                py-4
                rounded-2xl
                font-bold
                text-lg
                shadow-xl
                hover:shadow-2xl
                hover:scale-105
                transition-all
                duration-300
                "
              >
                📄 View Assignment Submissions
              </button>
        </div>
        </div>

        {/* USER CARD */}

        <div>

          <div className="bg-green-100 rounded-3xl p-5 mb-5">

            <h2 className="text-2xl font-bold text-green-700">
              {user?.name}
            </h2>

            <p className="text-gray-600 mt-1">
              Teacher Account
            </p>

          </div>
          
          <div className="mt-4">

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
              />

              <button
                onClick={handleProfileImageUpload}
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded-xl"
              >
                Upload Photo
              </button>

            </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-lg p-8 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">

              Welcome,

              <span className="text-green-600">
                {" "} {user?.name}
              </span>

            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage Your Smart LMS Professionally 🚀
            </p>

          </div>

        </div>
        <div className="relative">

        <button className="text-2xl">
          🔔
        </button>

        <div className="relative">
                <Bell size={28} />

                <span className="
                  absolute
                  -top-2
                  -right-2
                  bg-red-500
                  text-white
                  text-xs
                  px-2
                  rounded-full
                ">
                  {notifications.length}
                </span>
              </div>

        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {notifications.length}
        </span>

      </div>
        {/* ================= DASHBOARD ================= */}

        {activeTab === "dashboard" && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

              <h2 className="text-5xl font-bold text-green-600">
                {courses.length}
              </h2>

              <p className="mt-3 text-gray-600">
                Total Courses
              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

              <h2 className="text-5xl font-bold text-blue-600">
                {assignments.length}
              </h2>

              <p className="mt-3 text-gray-600">
                Assignments
              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

              <h2 className="text-5xl font-bold text-purple-600">
                120
              </h2>

              <p className="mt-3 text-gray-600">
                Students
              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

              <h2 className="text-5xl font-bold text-orange-600">
                Active
              </h2>

              <p className="mt-3 text-gray-600">
                Status
              </p>

            </div>

          </div>

        )}

        {/* ================= COURSE MANAGEMENT ================= */}

        {activeTab === "courses" && (

          <>
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

              <h2 className="text-3xl font-bold text-green-600 mb-6">

                {editId
                  ? "Update Course"
                  : "Add New Course"}

              </h2>

              <form
                onSubmit={handleCourseSubmit}
                className="grid md:grid-cols-2 gap-5"
              >

                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={courseData.title}
                  onChange={handleCourseChange}
                  className="border p-4 rounded-xl outline-none focus:border-green-500"
                />

                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  value={courseData.duration}
                  onChange={handleCourseChange}
                  className="border p-4 rounded-xl outline-none focus:border-green-500"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={courseData.description}
                  onChange={handleCourseChange}
                  rows="4"
                  className="border p-4 rounded-xl md:col-span-2 outline-none focus:border-green-500"
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={courseData.price}
                  onChange={handleCourseChange}
                  className="border p-4 rounded-xl outline-none focus:border-green-500"
                />

                <input
                  type="file"
                  name="thumbnail"
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      thumbnail: e.target.files[0],
                    })
                  }
                  className="border p-4 rounded-xl outline-none focus:border-green-500"
                />

                <input
                  type="text"
                  name="instructor"
                  placeholder="Instructor Name"
                  value={courseData.instructor}
                  onChange={handleCourseChange}
                  className="border p-4 rounded-xl outline-none focus:border-green-500"
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={courseData.category}
                  onChange={handleCourseChange}
                  className="border p-4 rounded-xl outline-none focus:border-green-500"
                />

                <select
                  name="level"
                  value={courseData.level}
                  onChange={handleCourseChange}
                  className="border p-4 rounded-xl outline-none focus:border-green-500"
                >

                  <option>
                    Beginner
                  </option>

                  <option>
                    Intermediate
                  </option>

                  <option>
                    Advanced
                  </option>
                </select>
                  
                <div className="md:col-span-2">

                              <h3 className="text-xl font-bold mb-3">
                                Lessons
                              </h3>

                              {courseData.lessons.map((lesson, index) => (

                                <div
                                  key={index}
                                  className="border p-4 rounded-xl mb-4"
                                >

                                  <input
                                    type="text"
                                    placeholder="Lesson Title"
                                    value={lesson.title}
                                    onChange={(e) =>
                                      handleLessonChange(
                                        index,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                    className="border p-3 rounded-xl w-full mb-3"
                                  />

                                  <input
                                    type="text"
                                    placeholder="YouTube Embed URL"
                                    value={lesson.videoUrl}
                                    onChange={(e) =>
                                      handleLessonChange(
                                        index,
                                        "videoUrl",
                                        e.target.value
                                      )
                                    }
                                    className="border p-3 rounded-xl w-full mb-3"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => removeLesson(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                                  >
                                    Remove Lesson
                                  </button>

                                </div>

                              ))}

                              <button
                                type="button"
                                onClick={addLesson}
                                className="bg-blue-600 text-white px-5 py-3 rounded-xl"
                              >
                                + Add Lesson
                              </button>

                            </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
                >

                  {loading
                    ? "Processing..."
                    : editId
                    ? "Update Course"
                    : "Add Course"}

                </button>

              </form>
                
            </div>

            {/* COURSE LIST */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

              {courses.map((course) => (

                <div
                  key={course._id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >

                  <img
                    src={
                      course.thumbnail ||
                      "https://via.placeholder.com/400x200"
                    }
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold text-green-600">
                      {course.title}
                    </h2>

                    <p className="text-gray-600 mt-3">
                      {course.description}
                    </p>

                    <div className="flex justify-between items-center mt-5">

                      <span className="text-green-600 font-bold text-xl">
                        ₹ {course.price}
                      </span>

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm">
                        {course.duration}
                      </span>

                    </div>

                    <div className="flex gap-4 mt-6">

                      <button
                        onClick={() =>
                          handleEdit(course)
                        }
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(course._id)
                        }
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </>
        )}

        {/* ================= ASSIGNMENTS ================= */}

          {activeTab === "assignments" && (

            <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

              <div className="flex justify-between items-center mb-8">

                        <h2 className="text-4xl font-bold text-blue-600">
                          Assignment Management
                        </h2>

                        <button
                          onClick={() => navigate("/teacher/submissions")}
                          className="
                            bg-gradient-to-r
                            from-purple-600
                            to-pink-500
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            font-semibold
                            shadow-lg
                            hover:scale-105
                            transition-all
                            duration-300
                          "
                        >
                          📄 View Submissions
                        </button>

                      </div>


              {/* ASSIGNMENT FORM */}

              <form
                onSubmit={handleAssignmentSubmit}
                className="space-y-5"
              >

                <input
                  type="text"
                  name="title"
                  placeholder="Assignment Title"
                  value={assignmentData.title}
                  onChange={handleAssignmentChange}
                  className="w-full border p-4 rounded-xl"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={assignmentData.description}
                  onChange={handleAssignmentChange}
                  rows="4"
                  className="w-full border p-4 rounded-xl"
                />

                <input
                  type="date"
                  name="dueDate"
                  value={assignmentData.dueDate}
                  onChange={handleAssignmentChange}
                  className="w-full border p-4 rounded-xl"
                />

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="border p-3 w-full mt-3 rounded-lg"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
                >

                  {loading
                  ? "Processing..."
                  : assignmentEditId
                  ? "Update Assignment"
                  : "Create Assignment"}
                </button>

              </form>

              {/* ================= ASSIGNMENT LIST ================= */}

              <div className="mt-10 grid md:grid-cols-2 gap-6">

                {assignments.map((assignment) => (

                  <div
                    key={assignment._id}
                    className="bg-gray-50 border rounded-2xl p-6 shadow-sm"
                  >

                    <h3 className="text-2xl font-bold text-blue-600">
                      {assignment.title}
                    </h3>

                    <p className="text-gray-600 mt-3">
                      {assignment.description}
                    </p>

                    <div className="mt-4 flex justify-between items-center">

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm">
                        Due:
                        {" "}
                        {new Date(
                          assignment.dueDate
                        ).toLocaleDateString()}
                      </span>
                        <div className="flex gap-3 mt-5">

                          <button
                              onClick={() =>
                                handleEditAssignment(
                                  assignment
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                            >
                              Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteAssignment(
                                assignment._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                          >
                            Delete
                          </button>

                        </div>
                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}
        {/* ================= QUIZ ================= */}

          {activeTab === "quiz" && (

            <div>

              <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                <h2 className="text-3xl font-bold text-purple-600 mb-6">
                  🤖 AI Quiz Generator
                </h2>

                <div className="mb-6">

                  <input
                    type="text"
                    placeholder="Enter Topic"
                    value={quizTopic}
                    onChange={(e) =>
                      setQuizTopic(e.target.value)
                    }
                    className="w-full border p-4 rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={generateQuiz}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-3"
                  >
                    Generate Quiz
                  </button>
                  {generatedQuizText && (

                      <div className="mt-6 bg-gray-100 p-5 rounded-xl">

                        <h3 className="font-bold mb-3">
                          AI Generated Quiz
                        </h3>

                        <pre className="whitespace-pre-wrap">
                          {generatedQuizText}
                        </pre>

                      </div>

                    )}

                </div>

                <form
                  onSubmit={handleQuizSubmit}
                  className="space-y-5"
                >

                  <input
                    type="text"
                    name="title"
                    placeholder="Quiz Title"
                    value={quizData.title}
                    onChange={handleQuizChange}
                    className="w-full border p-4 rounded-xl"
                  />

                  <input
                    type="text"
                    name="question"
                    placeholder="Question"
                    value={quizData.question}
                    onChange={handleQuizChange}
                    className="w-full border p-4 rounded-xl"
                  />

                  <div className="grid md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      name="option1"
                      placeholder="Option 1"
                      value={quizData.option1}
                      onChange={handleQuizChange}
                      className="border p-4 rounded-xl"
                    />

                    <input
                      type="text"
                      name="option2"
                      placeholder="Option 2"
                      value={quizData.option2}
                      onChange={handleQuizChange}
                      className="border p-4 rounded-xl"
                    />

                    <input
                      type="text"
                      name="option3"
                      placeholder="Option 3"
                      value={quizData.option3}
                      onChange={handleQuizChange}
                      className="border p-4 rounded-xl"
                    />

                    <input
                      type="text"
                      name="option4"
                      placeholder="Option 4"
                      value={quizData.option4}
                      onChange={handleQuizChange}
                      className="border p-4 rounded-xl"
                    />

                  </div>

                  <input
                    type="text"
                    name="answer"
                    placeholder="Correct Answer"
                    value={quizData.answer}
                    onChange={handleQuizChange}
                    className="w-full border p-4 rounded-xl"
                  />

                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl transition"
                  >
                    Generate Quiz
                  </button>

                </form>

              </div>
              <h2>Total Quizzes: {quizzes.length}</h2>

              {/* CREATED QUIZZES */}

              <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                <h3 className="text-xl font-bold mb-4">
                  Created Quizzes
                </h3>

                {quizzes.length > 0 ? (

                  quizzes.map((quiz) => (

                    <div
                      key={quiz._id}
                      className="bg-gray-100 p-4 rounded-xl mb-3"
                    >

                      <h4 className="font-bold text-lg">
                        {quiz.title}
                      </h4>

                      <p>
                        Questions: {quiz.questions.length}
                      </p>

                      <button
                        onClick={() =>
                          deleteQuiz(quiz._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-3"
                      >
                        Delete Quiz
                      </button>

                    </div>

                  ))

                ) : (

                  <p className="text-gray-500">
                    No quizzes created yet.
                  </p>

                )}

              </div>

            </div>

          )}
              
        {/* ================= ATTENDANCE ================= */}

          {activeTab === "attendance" && (

            <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

              <h2 className="text-3xl font-bold text-green-600 mb-6">
                📅 Attendance Management
              </h2>

              <form
                onSubmit={
                  handleAttendanceSubmit
                }
                className="grid md:grid-cols-2 gap-5"
              >

                <input
                  type="text"
                  name="studentId"
                  placeholder="Student ID"
                  value={
                    attendanceData.studentId
                  }
                  onChange={
                    handleAttendanceChange
                  }
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  name="studentName"
                  placeholder="Student Name"
                  value={
                    attendanceData.studentName
                  }
                  onChange={
                    handleAttendanceChange
                  }
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  name="courseId"
                  placeholder="Course ID"
                  value={
                    attendanceData.courseId
                  }
                  onChange={
                    handleAttendanceChange
                  }
                  className="border p-4 rounded-xl"
                />

                <input
                  type="date"
                  name="date"
                  value={
                    attendanceData.date
                  }
                  onChange={
                    handleAttendanceChange
                  }
                  className="border p-4 rounded-xl"
                />

                <select
                  name="status"
                  value={
                    attendanceData.status
                  }
                  onChange={
                    handleAttendanceChange
                  }
                  className="border p-4 rounded-xl"
                >

                  <option>
                    Present
                  </option>

                  <option>
                    Absent
                  </option>

                </select>

                <button
                    type="submit"
                    className="bg-green-600 text-white py-4 rounded-xl"
                  >
                    {attendanceEditId
                      ? "Update Attendance"
                      : "Mark Attendance"}
                </button>

              </form>
                  {/* ATTENDANCE LIST */}

                <div className="mt-10 overflow-x-auto">

                  <table className="w-full border-collapse">

                    <thead>

                      <tr className="bg-green-100">

                        <th className="p-4 text-left">
                          Student
                        </th>

                        <th className="p-4 text-left">
                          Course
                        </th>

                        <th className="p-4 text-left">
                          Status
                        </th>

                        <th className="p-4 text-left">
                          Date
                        </th>

                        <th className="p-4 text-left">
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {attendanceList.map(
                        (item) => (

                          <tr
                            key={item._id}
                            className="border-b"
                          >

                            <td className="p-4">
                              {item.studentName}
                            </td>

                            <td className="p-4">
                              {item.courseId}
                            </td>

                            <td className="p-4">

                              <span
                                className={`px-4 py-2 rounded-xl text-white ${
                                  item.status ===
                                  "Present"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {item.status}
                              </span>

                            </td>

                            <td className="p-4">
                              {new Date(item.date).toLocaleDateString()}
                            </td>
                            
                            <td className="p-4 flex gap-3">

                                <button
                                  onClick={() =>
                                    handleEditAttendance(item)
                                  }
                                  className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    handleDeleteAttendance(item._id)
                                  }
                                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                                >
                                  Delete
                                </button>

                              </td>
                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>
            </div>
            
          )}
          <div className="mt-10">

                <h2 className="text-2xl font-bold text-blue-600 mb-5">
                  📊 Attendance Percentage
                </h2>

                <table className="w-full border-collapse">

                  <thead>

                    <tr className="bg-blue-100">

                      <th className="p-4">Student</th>

                      <th className="p-4">Present</th>

                      <th className="p-4">Total</th>

                      <th className="p-4">Percentage</th>

                    </tr>

                  </thead>

                  <tbody>

                    {attendanceAnalytics.map((student,index) => (

                      <tr
                        key={index}
                        className="border-b"
                      >

                        <td className="p-4">
                          {student.studentName}
                        </td>

                        <td className="p-4">
                          {student.present}
                        </td>

                        <td className="p-4">
                          {student.total}
                        </td>

                        <td className="p-4 font-bold text-green-600">
                          {student.percentage}%
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
              <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                  <h2 className="text-3xl font-bold text-green-600 mb-6">
                    📊 Attendance Chart
                  </h2>

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >

                    <PieChart>

                      <Pie
                        data={[

                          {
                            name: "Present",
                            value:
                              attendanceChart.present,
                          },

                          {
                            name: "Absent",
                            value:
                              attendanceChart.absent,
                          },

                        ]}

                        dataKey="value"

                        outerRadius={100}

                      >

                        <Cell fill="#22c55e" />

                        <Cell fill="#ef4444" />

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>
              <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                <h2 className="text-3xl font-bold text-blue-600 mb-6">

                📜 Attendance History

                </h2>

                <table className="w-full">

                <thead>

                <tr>

                <th>Student</th>
                <th>Status</th>
                <th>Date</th>

                </tr>

                </thead>

                <tbody>

                {attendanceHistory.map((item) => (

                <tr key={item._id}>

                <td>{item.studentName}</td>

                <td>{item.status}</td>

                <td>
                {new Date(item.date)
                .toLocaleDateString()}
                </td>

                </tr>

                ))}

                </tbody>

                </table>

                </div>
        {/* ================= ANALYTICS ================= */}

            {activeTab === "analytics" && (

             <>
                  {/* Quick Actions */}

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">

                        <button
                          onClick={() => setActiveTab("courses")}
                          className="bg-blue-500 text-white p-5 rounded-2xl shadow-lg hover:bg-blue-600 transition"
                        >
                          ➕ Add Course
                        </button>

                        <button
                          onClick={() => setActiveTab("assignments")}
                          className="bg-green-500 text-white p-5 rounded-2xl shadow-lg hover:bg-green-600 transition"
                        >
                          📝 Create Assignment
                        </button>

                        <button
                          onClick={() => setActiveTab("analytics")}
                          className="bg-purple-500 text-white p-5 rounded-2xl shadow-lg hover:bg-purple-600 transition"
                        >
                          📊 View Analytics
                        </button>

                        <button
                          onClick={() => setActiveTab("attendance")}
                          className="bg-orange-500 text-white p-5 rounded-2xl shadow-lg hover:bg-orange-600 transition"
                        >
                          📅 Mark Attendance
                        </button>

                      </div>
                      {/* Teacher Summary */}

                    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                      <h2 className="text-2xl font-bold text-gray-700 mb-6">
                        👨‍🏫 Teacher Summary
                      </h2>

                      <div className="grid md:grid-cols-4 gap-5">

                        <div className="bg-blue-100 p-5 rounded-2xl text-center">
                          <h3 className="font-bold text-blue-700">
                            Name
                          </h3>
                          <p className="text-lg font-semibold mt-2">
                            {user?.name}
                          </p>
                        </div>

                        <div className="bg-green-100 p-5 rounded-2xl text-center">
                          <h3 className="font-bold text-green-700">
                            Email
                          </h3>
                          <p className="text-sm font-semibold mt-2 break-all">
                            {user?.email}
                          </p>
                        </div>

                        <div className="bg-purple-100 p-5 rounded-2xl text-center">
                          <h3 className="font-bold text-purple-700">
                            Courses
                          </h3>
                          <p className="text-2xl font-bold mt-2">
                            {courses.length}
                          </p>
                        </div>

                        <div className="bg-orange-100 p-5 rounded-2xl text-center">
                          <h3 className="font-bold text-orange-700">
                            Assignments
                          </h3>
                          <p className="text-2xl font-bold mt-2">
                            {assignments.length}
                          </p>
                        </div>

                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

                  
                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
                    <h2 className="text-5xl font-bold text-blue-600">
                      {analytics.totalStudents}
                    </h2>
                    <p className="mt-3 text-gray-600">
                      Total Students
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
                    <h2 className="text-5xl font-bold text-green-600">
                      {analytics.attendanceRate}%
                    </h2>
                    <p className="mt-3 text-gray-600">
                      Attendance Rate
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
                    <h2 className="text-5xl font-bold text-purple-600">
                      {analytics.completionRate}%
                    </h2>
                    <p className="mt-3 text-gray-600">
                      Course Completion
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
                    <h2 className="text-5xl font-bold text-orange-600">
                      {assignments.length}
                    </h2>
                    <p className="mt-3 text-gray-600">
                      Total Assignments
                    </p>
                  </div>
                  

                    </div>

                  {/* Progress Analytics */}

                    <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                  
                  <h2 className="text-2xl font-bold text-gray-700 mb-8">
                    Analytics Overview
                  </h2>

                  <div className="space-y-8">

                    <div>

                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">
                          Total Students
                        </span>

                        <span>
                          {analytics.totalStudents}
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-5">

                        <div
                          className="bg-blue-500 h-5 rounded-full"
                          style={{
                            width: `${Math.min(
                              analytics.totalStudents * 20,
                              100
                            )}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                    <div>

                      <div className="flex justify-between mb-2">

                        <span className="font-semibold">
                          Attendance Rate
                        </span>

                        <span>
                          {analytics.attendanceRate}%
                        </span>

                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-5">

                        <div
                          className="bg-green-500 h-5 rounded-full"
                          style={{
                            width: `${analytics.attendanceRate}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                    <div>

                      <div className="flex justify-between mb-2">

                        <span className="font-semibold">
                          Course Completion
                        </span>

                        <span>
                          {analytics.completionRate}%
                        </span>

                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-5">

                        <div
                          className="bg-purple-500 h-5 rounded-full"
                          style={{
                            width: `${analytics.completionRate}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                  </div>
                  
                    </div>
                            <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                              📚 Course Wise Analytics
                            </h2>

                            <div className="space-y-4">

                              {analytics.courseAnalytics?.map(
                                (course, index) => (

                                  <div
                                    key={index}
                                    className="flex justify-between items-center border-b pb-3"
                                  >

                                    <span className="font-semibold">
                                      {course.courseName}
                                    </span>

                                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                                      {course.students} Students
                                    </span>

                                  </div>

                                )
                              )}

                            </div>

                          </div>
                          {/* Course Wise Student Analytics */}

                              <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

                                <h2 className="text-2xl font-bold mb-6">
                                  📚 Course Wise Students
                                </h2>

                                <ResponsiveContainer width="100%" height={400}>

                                  <BarChart data={analytics.courseAnalytics}>

                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis
                                      dataKey="courseName"
                                      angle={-25}
                                      textAnchor="end"
                                      interval={0}
                                      height={100}
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                      dataKey="students"
                                      fill="#22c55e"
                                      radius={[8, 8, 0, 0]}
                                    />

                                  </BarChart>

                                </ResponsiveContainer>

                              </div>
                          {/* Assignment Analytics */}

                          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                              📝 Assignment Analytics
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

                              <div className="bg-orange-100 p-5 rounded-2xl text-center">
                                <h3 className="font-bold text-orange-700">
                                  Assignments
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                  {analytics.totalAssignments}
                                </p>
                              </div>

                              <div className="bg-blue-100 p-5 rounded-2xl text-center">
                                <h3 className="font-bold text-blue-700">
                                  Submitted
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                  {analytics.totalSubmissions}
                                </p>
                              </div>

                              <div className="bg-green-100 p-5 rounded-2xl text-center">
                                <h3 className="font-bold text-green-700">
                                  Approved
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                  {analytics.approvedSubmissions}
                                </p>
                              </div>

                              <div className="bg-yellow-100 p-5 rounded-2xl text-center">
                                <h3 className="font-bold text-yellow-700">
                                  Pending
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                  {analytics.pendingSubmissions}
                                </p>
                              </div>

                              <div className="bg-red-100 p-5 rounded-2xl text-center">
                                <h3 className="font-bold text-red-700">
                                  Rejected
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                  {analytics.rejectedSubmissions}
                                </p>
                              </div>

                            </div>

                          </div>

                          {/* Monthly Analytics */}

                          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                              📊 Monthly Analytics
                            </h2>
                              

                            <LineChart
                              width={800}
                              height={350}
                              data={analytics.monthlyAnalytics}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />

                              <Line
                                type="monotone"
                                dataKey="students"
                                stroke="#2563eb"
                                strokeWidth={4}
                              />
                            </LineChart>

                          </div>
                          {/* Student Analytics Pie Chart */}

                            <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

                              <h2 className="text-2xl font-bold mb-6">
                                👨‍🎓 Student Analytics
                              </h2>

                              <PieChart width={400} height={300}>

                                <Pie
                                  data={analyticsChartData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={100}
                                  dataKey="value"
                                  label
                                >

                                  <Cell fill="#3b82f6" />
                                  <Cell fill="#8b5cf6" />

                                </Pie>

                                <Tooltip />
                                <Legend />

                              </PieChart>

                            </div>
                          {/* Course Completion Analytics */}

                              <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

                                <h2 className="text-2xl font-bold mb-6">
                                  🎓 Course Completion Analytics
                                </h2>

                                <PieChart width={400} height={300}>

                                  <Pie
                                    data={completionPieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label
                                  >

                                    <Cell fill="#22c55e" />
                                    <Cell fill="#ef4444" />

                                  </Pie>

                                  <Tooltip />
                                  <Legend />

                                </PieChart>

                              </div>
                              <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

                                  <h2 className="text-2xl font-bold mb-6">
                                    🥧 Assignment Status Analytics
                                  </h2>

                                  <PieChart width={400} height={300}>
                                    <Pie
                                      data={pieData}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={100}
                                      dataKey="value"
                                      label
                                    >
                                      {pieData.map((entry, index) => (
                                        <Cell
                                          key={index}
                                          fill={COLORS[index % COLORS.length]}
                                        />
                                      ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend />
                                  </PieChart>

                                </div>
                                
                            
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                            <div className="bg-white rounded-3xl shadow-lg p-6">
                              <h3 className="text-lg font-bold text-blue-600">
                                📚 Last Added Course
                              </h3>

                              <p className="mt-3 font-semibold">
                                {analytics.latestCourse?.title || "No Course"}
                              </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-lg p-6">
                              <h3 className="text-lg font-bold text-green-600">
                                📝 Last Assignment
                              </h3>

                              <p className="mt-3 font-semibold">
                                {analytics.latestAssignment?.title || "No Assignment"}
                              </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-lg p-6">
                              <h3 className="text-lg font-bold text-purple-600">
                                📅 Last Attendance
                              </h3>

                              <p className="mt-3 font-semibold">
                                {analytics.latestAttendance?.studentName || "No Attendance"}
                              </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-lg p-6">
                              <h3 className="text-lg font-bold text-red-600">
                                📄 Last Submission
                              </h3>

                              <p className="mt-3 font-semibold">
                                    {analytics.latestSubmission?.studentId?.name ||
                                      "No Submission"}
                              </p>
                            </div>

                          </div>
                          {/* Recent Activities Timeline */}

                              <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                                <h2 className="text-2xl font-bold text-gray-700 mb-8">
                                  📌 Recent Activities
                                </h2>

                                <div className="space-y-6">

                                  {analytics.recentActivities?.map(
                                    (activity, index) => (

                                      <div
                                        key={index}
                                        className="flex items-start gap-4"
                                      >

                                        <div className="w-4 h-4 bg-blue-500 rounded-full mt-2"></div>

                                        <div>

                                          <h3 className="font-semibold text-gray-800">
                                            {activity.title}
                                          </h3>

                                          <p className="text-sm text-gray-500">
                                            {activity.time}
                                          </p>

                                        </div>

                                      </div>

                                    )
                                  )}

                                </div>

                              </div>
                                  <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                                        <h2 className="text-2xl font-bold text-purple-700 mb-6">
                                          🧠 Quiz Results
                                        </h2>

                                          <p>
                                            Results Count:
                                            {quizResults.length}
                                          </p>

                                        <table className="w-full border">

                                          <thead>

                                            <tr className="bg-gray-100">

                                              <th className="border p-3">
                                                Student
                                              </th>

                                              <th className="border p-3">
                                                Quiz
                                              </th>

                                              <th className="border p-3">
                                                Score
                                              </th>

                                              <th className="border p-3">
                                                Percentage
                                              </th>

                                              <th className="border p-3">
                                                Attempt Date
                                              </th>


                                            </tr>

                                          </thead>

                                          <tbody>

                                            {quizResults.length > 0 ? (

                                              quizResults.map((result) => (

                                                <tr
                                                  key={result._id}
                                                >

                                                  <td className="border p-3">

                                                    {
                                                      result.studentId?.name
                                                    }

                                                  </td>

                                                  <td className="border p-3">

                                                    {
                                                      result.quizId?.title
                                                    }

                                                  </td>

                                                  <td className="border p-3">

                                                  {result.score}/{result.total}

                                                </td>

                                                <td className="border p-3">

                                                  {(
                                                    (result.score /
                                                      result.total) *
                                                    100
                                                  ).toFixed(1)}%

                                                </td>

                                                <td className="border p-3">

                                                  {new Date(
                                                    result.createdAt
                                                  ).toLocaleDateString()}

                                                </td>

                                                </tr>

                                              ))

                                            ) : (

                                              <tr>

                                                <td
                                                  colSpan="4"
                                                  className="text-center p-4"
                                                >

                                                  No Quiz Results

                                                </td>

                                              </tr>

                                            )}

                                          </tbody>

                                        </table>

                                      </div>
                                <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

                                <div className="flex items-center justify-between mb-6">

                                  <h2 className="text-2xl font-bold text-gray-700">
                                    🔔 Notifications
                                  </h2>

                                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                                    {notifications.length}
                                  </span>

                                </div>


                                <div className="space-y-4">

                                  {notifications.map((item, index) => (

                                    <div
                                      key={index}
                                      className="
                                      flex
                                      items-start
                                      gap-4
                                      p-4
                                      rounded-2xl
                                      border
                                      hover:bg-blue-50
                                      transition
                                      "
                                    >

                                      <div className="text-2xl">
                                        🔔
                                      </div>

                                      <div>

                                          <h3 className="font-semibold text-gray-800">
                                            {item.title}
                                          </h3>

                                        <button
                                            onClick={() =>
                                              markAsRead(item._id)
                                            }
                                            className="
                                            mt-2
                                            bg-green-500
                                            hover:bg-green-600
                                            text-white
                                            px-3
                                            py-1
                                            rounded-lg
                                            text-sm
                                            "
                                          >
                                            ✓ Mark Read
                                          </button>

                                        <p className="text-sm text-gray-500">
                                          {new Date(item.date).toLocaleString()}
                                        </p>

                                      </div>

                                    </div>

                                  ))}

                                </div>
                              </div>
                             <div className="grid md:grid-cols-4 gap-6 mt-8">

                                  <div className="bg-white p-6 rounded-3xl shadow-lg">

                                    <h3 className="font-bold text-blue-600">
                                      📝 Total Quizzes
                                    </h3>

                                    <p className="text-3xl font-bold mt-2">
                                      {quizAnalytics.totalQuizzes}
                                    </p>

                                  </div>

                                  <div className="bg-white p-6 rounded-3xl shadow-lg">

                                    <h3 className="font-bold text-green-600">
                                      🎯 Total Attempts
                                    </h3>

                                    <p className="text-3xl font-bold mt-2">
                                      {quizAnalytics.totalAttempts}
                                    </p>

                                  </div>

                                  <div className="bg-white p-6 rounded-3xl shadow-lg">

                                    <h3 className="font-bold text-purple-600">
                                      📊 Average Score
                                    </h3>

                                    <p className="text-3xl font-bold mt-2">
                                      {quizAnalytics.averageScore}%
                                    </p>

                                  </div>

                                  <div className="bg-white p-6 rounded-3xl shadow-lg">

                                    <h3 className="font-bold text-red-600">
                                      🏆 Top Quiz
                                    </h3>

                                    <p className="font-semibold mt-2">
                                      {quizAnalytics.topQuiz}
                                    </p>

                                  </div>

                                </div>
                                <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                                  <h2 className="text-2xl font-bold text-gray-700 mb-6">
                                    📊 Quiz Attempts Analytics
                                  </h2>

                                  {attemptsChart.map(
                                    (item, index) => (

                                      <div
                                        key={index}
                                        className="mb-4"
                                      >

                                        <div className="flex justify-between mb-1">

                                          <span>
                                            {item.quizName}
                                          </span>

                                          <span>
                                            {item.attempts}
                                          </span>

                                        </div>

                                        <div className="w-full bg-gray-200 rounded-full h-4">

                                          <div
                                            className="bg-blue-600 h-4 rounded-full"
                                            style={{
                                              width:
                                                `${item.attempts * 30}px`,
                                            }}
                                          ></div>

                                        </div>

                                      </div>

                                    )
                                  )}

                                </div>
                                <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                                <h2 className="text-2xl font-bold text-gray-700 mb-6">
                                  📊 Quiz Attempts Chart
                                </h2>

                                <ResponsiveContainer
                                  width="100%"
                                  height={350}
                                >

                                  <BarChart
                                    data={attemptsChart}
                                  >

                                    <CartesianGrid
                                      strokeDasharray="3 3"
                                    />

                                    <XAxis
                                      dataKey="quizName"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                      dataKey="attempts"
                                      fill="#3b82f6"
                                    />

                                  </BarChart>

                                </ResponsiveContainer>

                              </div>
                             {/* BEST STUDENT CARD */}

                          {bestStudent && (

                            <div className="bg-yellow-50 border border-yellow-300 rounded-3xl p-6 mb-6">

                              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                                🏆 Best Student
                              </h2>

                              <h3 className="text-xl font-bold">
                                {bestStudent.name || "No Student"}
                              </h3>

                              <p className="mt-2">
                                📊 Average Score:
                                {" "}
                                {bestStudent.average
                                  ? Number(bestStudent.average).toFixed(1)
                                  : 0}%
                              </p>

                              <p>
                                📝 Total Attempts:
                                {" "}
                                {bestStudent.attempts || 0}
                              </p>

                            </div>

                          )}


                          {/* LEADERBOARD */}

                          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                            <h2 className="text-2xl font-bold text-yellow-600 mb-6">
                              🏆 Top Students Leaderboard
                            </h2>

                            {topStudents.length > 0 ? (

                              topStudents.map((student, index) => (

                                <div
                                  key={`${student.name}-${index}`}
                                  className="flex justify-between items-center border-b py-3"
                                >

                                  <div>

                                    <span className="font-bold mr-3">
                                      #{index + 1}
                                    </span>

                                    {student.name || "Unknown Student"}

                                    <p className="text-xs text-gray-500">
                                      Attempts:
                                      {" "}
                                      {student.attempts || 0}
                                    </p>

                                  </div>

                                  <div className="font-bold text-green-600">

                                    {student.average
                                      ? Number(student.average).toFixed(1)
                                      : 0}%

                                  </div>

                                </div>

                              ))

                            ) : (

                              <p className="text-gray-500">
                                No Quiz Attempts Yet
                              </p>

                            )}

                          </div>
                          {/* Top Course */}

                          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

                            <h2 className="text-2xl font-bold text-gray-700">
                              🏆 Top Performing Course
                            </h2>

                            <div className="mt-6">

                              <h3 className="text-xl font-bold text-green-600">
                                {analytics.topCourse?.courseName || "No Course"}
                              </h3>

                              <p className="mt-2 text-gray-600">
                                Students Enrolled:
                                {" "}
                                {analytics.topCourse?.students || 0}
                              </p>

                            </div>

                          </div>
                  </>

            )}
      </div>
            
    </div>


  );

}

export default TeacherDashboard;