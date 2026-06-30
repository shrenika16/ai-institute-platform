import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // ✅ Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ Password validation
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // ❌ Empty check
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    // ❌ Email check
    if (!isValidEmail(email)) {
      alert("Enter valid email address");
      return;
    }

    // ❌ Password check
    if (!isValidPassword(password)) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(res.data.message);
      if (res.data.user.role === "student") {

        navigate("/student/dashboard");

      } else if (res.data.user.role === "teacher") {

        navigate("/teacher/dashboard");

      }

      else if (
          res.data.user.role === "admin"
        ) {

          navigate("/admin/dashboard");

        }
      console.log(res.data);

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="mt-3 text-gray-500">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;