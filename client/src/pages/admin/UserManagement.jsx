import { useEffect, useState } from "react";
import axios from "axios";

function UserManagement() {

const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = async () => {
const res = await axios.get(
"http://localhost:5000/api/users"
);


setUsers(res.data);


};

const deleteUser = async (id) => {


if (!window.confirm("Delete User?"))
  return;

await axios.delete(
  `http://localhost:5000/api/users/${id}`
);

fetchUsers();


};

const totalStudents = users.filter(
(user) => user.role === "student"
).length;

const totalTeachers = users.filter(
(user) => user.role === "teacher"
).length;

const totalAdmins = users.filter(
(user) => user.role === "admin"
).length;

return (


<div className="min-h-screen bg-gray-100 p-8">

  <h1 className="text-4xl font-bold text-blue-600 mb-8">
    User Management
  </h1>

  <div className="grid md:grid-cols-4 gap-5 mb-8">

    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Total Users
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-2">
        {users.length}
      </p>
    </div>

    <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Students
      </h3>

      <p className="text-3xl font-bold text-green-600 mt-2">
        {totalStudents}
      </p>
    </div>

    <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Teachers
      </h3>

      <p className="text-3xl font-bold text-purple-600 mt-2">
        {totalTeachers}
      </p>
    </div>

    <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Admins
      </h3>

      <p className="text-3xl font-bold text-red-500 mt-2">
        {totalAdmins}
      </p>
    </div>

  </div>

  <div className="mb-6">

    <input
      type="text"
      placeholder="Search User..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="w-80 p-3 border rounded-xl"
    />

  </div>

  <div className="space-y-4">

    {users
      .filter((user) =>
        user.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
      )
      .map((user) => (

        <div
          key={user._id}
          className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
        >

          <div>

            <h3 className="font-bold text-lg">
              {user.name}
            </h3>

            <p className="text-gray-500">
              {user.email}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-white rounded-full text-sm ${
                user.role === "student"
                  ? "bg-green-500"
                  : user.role === "teacher"
                  ? "bg-blue-500"
                  : "bg-purple-500"
              }`}
            >
              {user.role}
            </span>

          </div>

          <button
            onClick={() =>
              deleteUser(user._id)
            }
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      ))}

  </div>

</div>


);
}

export default UserManagement;