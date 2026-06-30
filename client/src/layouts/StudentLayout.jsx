import { NavLink, Outlet, useNavigate } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";

function StudentLayout() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">

      {/* SIDEBAR */}
      <div className="w-72 bg-white shadow-2xl p-6 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-12">

            <div className="text-4xl">
              🎓
            </div>

            <h1 className="text-3xl font-bold text-blue-600">
              Student Panel
            </h1>

          </div>

          {/* MENU */}
          <div className="flex flex-col gap-4">

            <NavLink
              to="/student/dashboard"
              className={({ isActive }) =>
                `p-4 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              📚 My Courses
            </NavLink>

            <NavLink
              to="/student/dashboard/assignments"
              className={({ isActive }) =>
                `p-4 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-purple-100"
                }`
              }
            >
              📝 Assignments
            </NavLink>

            <NavLink
              to="/student/dashboard/attendance"
              className={({ isActive }) =>
                `p-4 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-green-100"
                }`
              }
            >
              📅 Attendance
            </NavLink>

            <NavLink
              to="/student/dashboard/quiz"
              className={({ isActive }) =>
                `p-4 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-pink-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-pink-100"
                }`
              }
            >
              🧪 Quiz / Test
            </NavLink>

            <NavLink
              to="/student/dashboard/ai-assistant"
              className={({ isActive }) =>
                `p-4 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-indigo-100"
                }`
              }
            >
              🤖 AI Assistant
            </NavLink>

          </div>

        </div>

        {/* USER */}
        <div>

          <div className="bg-blue-50 p-5 rounded-2xl mb-4">

            <p className="text-gray-500 text-sm">
              Logged in as
            </p>

            <h2 className="text-xl font-bold text-blue-600 mt-1">
              {user?.name}
            </h2>

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 p-8">

         <div className="flex justify-end mb-5">
            <NotificationBell />
         </div>

        <Outlet />

      </div>

    </div>

  );
}

export default StudentLayout;