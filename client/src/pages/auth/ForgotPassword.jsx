import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message || "Reset link sent!");
      setEmail("");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-700 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-center text-gray-800">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition">
            Send Reset Link
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;