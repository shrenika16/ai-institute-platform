import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-4">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-green-600 text-white p-3 rounded">
            Reset Password
          </button>
        </form>

      </div>
    </div>
  );
}

export default ResetPassword;