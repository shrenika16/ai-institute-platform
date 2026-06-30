import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/api/notifications/${user._id}`
      );

      setNotifications(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (id) => {
    try {

      await axios.put(
        `http://localhost:5000/api/notifications/read/${id}`
      );

      fetchNotifications();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, []);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🎓 AI Institute
        </Link>

        {/* PUBLIC MENU ONLY */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* AUTH SECTION */}
        <div className="flex items-center gap-3 relative">

          {token ? (
            <>
             <span className="hidden md:block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {user?.name} ({user?.role})
            </span>

            <div
                className="relative cursor-pointer"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
              >

                <Bell className="w-6 h-6 text-gray-700" />

                {notifications.filter((n) => !n.isRead).length > 0 && (

                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">

                    {notifications.filter((n) => !n.isRead).length}

                  </span>

                )}

              </div>
                {showNotifications && (

                <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-xl p-4 z-50">

                  <h3 className="font-bold mb-3">
                    Notifications
                  </h3>

                  {notifications.length === 0 ? (

                    <p className="text-gray-500">
                      No Notifications
                    </p>

                  ) : (

                    notifications.map((item) => (

                      <div
                          key={item._id}
                          className="border-b py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => markAsRead(item._id)}
                      >

                        <h4
                          className={`font-semibold ${
                            item.isRead
                              ? "text-gray-400"
                              : "text-black"
                          }`}
                        >
                          {item.title}
                        </h4>

                        <p
                          className={`text-sm ${
                            item.isRead
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {item.message}
                        </p>

                      </div>

                    ))

                  )}

                </div>

              )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
            >
              Logout
            </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                  Register
                </button>
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;