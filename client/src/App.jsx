import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ================= COMPONENTS ================= */

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ================= PUBLIC PAGES ================= */

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import Contact from "./pages/public/Contact";
import CourseDetails from "./pages/public/CourseDetails";

/* ================= AUTH PAGES ================= */

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* ================= STUDENT PAGES ================= */

import StudentDashboard from "./pages/student/StudentDashboard";
import AIStudyAssistant from "./pages/student/AIStudyAssistant";
import StudentQuiz from "./pages/student/StudentQuiz";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProfile from "./pages/student/StudentProfile";
import CourseLearningPage from "./pages/student/CourseLearningPage";
import StudentAssignmentSubmit from "./pages/student/StudentAssignmentSubmit";
import StudentSubmissionStatus from "./pages/student/StudentSubmissionStatus";
import QuizHistory from "./pages/student/QuizHistory";
import AttendanceHistory from "./pages/student/AttendanceHistory";

/* ================= TEACHER PAGES ================= */

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherQuiz from "./pages/teacher/TeacherQuiz";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherSubmissions from "./pages/teacher/TeacherSubmissions";

/* ================= Admin Pages ================= */

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import CourseManagement from "./pages/admin/AdminCourseManagement";
import Analytics from "./pages/admin/AdminAnalytics";
import Settings from "./pages/admin/AdminSettings";
import AdminNotification from "./pages/admin/AdminNotification";

/* ================= PROTECTED ROUTE ================= */

import ProtectedRoute from "./routes/ProtectedRoute";
import CertificatePage from "./pages/CertificatePage";

function App() {

  const location =
    useLocation();

  // =========================================
  // HIDE NAVBAR & FOOTER
  // =========================================

  const hideLayout =
  location.pathname.startsWith("/student") ||
  location.pathname.startsWith("/teacher") ||
  location.pathname.startsWith("/admin");

  return (

    <>

      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}

      {!hideLayout && <Navbar />}

      <Routes>

        {/* ========================================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        {/* COURSE DETAILS */}

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* ========================================= */}
        {/* AUTH ROUTES */}
        {/* ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
        path="/forgot-password"
        element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ========================================= */}
        {/* STUDENT ROUTES */}
        {/* ========================================= */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard/ai"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <AIStudyAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard/quiz"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard/assignments"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentAssignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard/attendance"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/course/:id"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <CourseLearningPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/assignment-submit/:id"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentAssignmentSubmit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/submission-status"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentSubmissionStatus />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/student/dashboard/quiz-history"
          element={<QuizHistory />}
          />
        <Route

          path="/student/attendance-history"

          element={
          <AttendanceHistory />
          }

          />
        {/* ========================================= */}
        {/* TEACHER ROUTES */}
        {/* ========================================= */}

        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["teacher"]}
            >
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/submissions"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherSubmissions />
            </ProtectedRoute>
          }
        />
        {/* AI QUIZ GENERATOR */}

        <Route
          path="/teacher/quiz"
          element={
            <ProtectedRoute
              allowedRoles={["teacher"]}
            >
              <TeacherQuiz />
            </ProtectedRoute>
          }
        />

        {/* TEACHER PROFILE */}

        <Route
          path="/teacher/profile"
          element={
            <ProtectedRoute
              allowedRoles={["teacher"]}
            >
              <TeacherProfile />
            </ProtectedRoute>
          }
        />
        
        {/* ========================================= */}
        {/* ADMIN ROUTES */}
        {/* ========================================= */}

        <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={["admin"]}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
        />
       <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={<AdminNotification />}
        />

        {/* ========================================= */}
        {/* REDIRECT ROUTES */}
        {/* ========================================= */}

        <Route
          path="/teacher/dashboard/profile"
          element={
            <Navigate
              to="/teacher/profile"
            />
          }
        />

        <Route
          path="/student/dashboard/profile"
          element={
            <Navigate
              to="/student/profile"
            />
          }
        />

        <Route
          path="/student/certificate/:courseId"
          element={<CertificatePage />}
        />

        {/* ========================================= */}
        {/* 404 ROUTE */}
        {/* ========================================= */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

      {/* ========================================= */}
      {/* FOOTER */}
      {/* ========================================= */}

      {!hideLayout && <Footer />}
          <ToastContainer
            position="top-right"
            autoClose={3000}
          />
    </>

  );

}

export default App;