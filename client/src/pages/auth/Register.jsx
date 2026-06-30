import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

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

    const { name, email, password, role } = formData;

    // ❌ Empty check
    if (!name || !email || !password || !role) {
      alert("All fields are required");
      return;
    }

    // ❌ Name check
    if (name.length < 2) {
      alert("Enter valid name");
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);
      console.log(res.data);

      // optional: reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="mt-3 text-gray-500">
            Register to continue learning
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Role */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500"
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;