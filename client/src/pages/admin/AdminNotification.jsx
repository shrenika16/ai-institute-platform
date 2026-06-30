import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";

function AdminNotification() {

  const [form, setForm] = useState({
    title: "",
    message: "",
    receiver: "",
    receiverType: "student",
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.message ||
      !form.receiver
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/notifications",
        form
      );

      toast.success("Notification Sent Successfully ✅");

      setForm({
        title: "",
        message: "",
        receiver: "",
        receiverType: "student",
      });

    } catch (error) {
      console.log(error);
      toast.error("Failed to Send Notification ❌");
    }
  };

    return (
        <div className="flex">

        <AdminSidebar />

        <div className="flex-1 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Send Notification
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
            name="receiver"
            value={form.receiver}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select User</option>

            {users
              .filter(
                (u) => u.role === form.receiverType
              )
              .map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))}
        </select>

        <select
          name="receiverType"
          value={form.receiverType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Send Notification
        </button>

      </form>

    </div>
    </div>
    
  );
}

export default AdminNotification;