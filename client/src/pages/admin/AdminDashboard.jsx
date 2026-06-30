import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

const [users, setUsers] = useState([]);
const [courses, setCourses] = useState([]);
const [recentNotifications, setRecentNotifications] = useState([]);
const [dashboard, setDashboard] = useState({
  totalStudents: 0,
  totalTeachers: 0,
  totalCourses: 0,
  totalAssignments: 0,
  totalEnrollments: 0,
  totalSubmissions: 0,
});

const navigate = useNavigate();

useEffect(() => {
fetchUsers();
fetchCourses();
fetchDashboard();
fetchRecentNotifications();
}, []);

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

const totalStudents = users.filter(
(user) => user.role === "student"
).length;

const totalTeachers = users.filter(
(user) => user.role === "teacher"
).length;

const totalPublishedCourses = courses.filter(
(course) => course.status === "Published"
).length;

const totalDraftCourses = courses.filter(
(course) => course.status === "Draft"
).length;

const totalRevenue = courses.reduce(
(sum, course) =>
sum +
Number(course.price || 0) *
Number(course.studentsCount || 0),
0
);
const fetchDashboard = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/dashboard/admin"
    );

    setDashboard(res.data);

  } catch (error) {

    console.log(error);

  }
};

const fetchRecentNotifications = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/notifications"
    );

    setRecentNotifications(res.data);

  } catch (error) {

    console.log(error);

  }
};

return (

<div className="min-h-screen bg-gray-100 p-8">

  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl shadow-lg mb-8">


<h1 className="text-4xl font-bold">
  Welcome Admin 👋
</h1>

<p className="mt-2 text-lg">
  Manage Users, Courses and Analytics
</p>


  </div>

  <div className="grid md:grid-cols-4 gap-6 mb-8">


<div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-3xl shadow-lg">
  <h2 className="text-gray-500">
    Total Users
  </h2>

 <p className="text-4xl font-bold text-blue-600 mt-3">
  {dashboard.totalStudents + dashboard.totalTeachers}
 </p>
</div>

<div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-3xl shadow-lg">
  <h2 className="text-gray-500">
    Students
  </h2>

  <p className="text-4xl font-bold text-green-600 mt-3">
   {dashboard.totalStudents}
  </p>
</div>

<div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-3xl shadow-lg">
  <h2 className="text-gray-500">
    Teachers
  </h2>

  <p className="text-4xl font-bold text-purple-600 mt-3">
   {dashboard.totalTeachers}
  </p>
</div>

<div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-3xl shadow-lg">
  <h2 className="text-gray-500">
    Courses
  </h2>

  <p className="text-4xl font-bold text-red-500 mt-3">
  {dashboard.totalCourses}
  </p>
</div>


  </div>

  <div className="grid md:grid-cols-3 gap-6 mb-10">


<div className="bg-white p-6 rounded-3xl shadow-lg">
  <h3 className="text-gray-500">
    Published Courses
  </h3>

  <p className="text-3xl font-bold text-green-600 mt-3">
    {totalPublishedCourses}
  </p>
</div>

<div className="bg-white p-6 rounded-3xl shadow-lg">
  <h3 className="text-gray-500">
    Draft Courses
  </h3>

  <p className="text-3xl font-bold text-yellow-500 mt-3">
    {totalDraftCourses}
  </p>
</div>

<div className="bg-white p-6 rounded-3xl shadow-lg">
  <h3 className="text-gray-500">
    Total Revenue
  </h3>

  <p className="text-3xl font-bold text-green-600 mt-3">
    ₹ {totalRevenue}
  </p>
</div>

</div>
  {/* RECENT NOTIFICATIONS */}

<div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

  <div className="flex justify-between items-center mb-5">

    <h2 className="text-2xl font-bold text-indigo-600">
      🔔 Recent Notifications
    </h2>

  </div>

  {recentNotifications.length === 0 ? (

    <p className="text-gray-500">
      No Notifications Found
    </p>

  ) : (

    recentNotifications
      .slice(0, 5)
      .map((item) => (

        <div
          key={item._id}
          className="border-b py-3"
        >

          <h3 className="font-semibold text-lg">

            {item.title}

          </h3>

          <p className="text-gray-600">

            {item.message}

          </p>

          <p className="text-sm text-gray-400 mt-1">

            {new Date(item.createdAt).toLocaleString()}

          </p>

        </div>

      ))

  )}

</div>

    <h2 className="text-2xl font-bold mt-10 mb-5">
      Platform Analytics
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h3 className="text-gray-500">
          Total Assignments
        </h3>

        <p className="text-4xl font-bold text-indigo-600 mt-3">
          {dashboard.totalAssignments}
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h3 className="text-gray-500">
          Total Enrollments
        </h3>

        <p className="text-4xl font-bold text-green-600 mt-3">
          {dashboard.totalEnrollments}
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h3 className="text-gray-500">
          Total Submissions
        </h3>

        <p className="text-4xl font-bold text-purple-600 mt-3">
          {dashboard.totalSubmissions}
        </p>

      </div>

    </div>

  <h2 className="text-2xl font-bold mb-5">
    Quick Actions
  </h2>

  <div className="grid md:grid-cols-4 gap-5">


<div
  onClick={() => navigate("/admin/users")}
  className="bg-blue-600 text-white p-6 rounded-2xl cursor-pointer hover:scale-105 transition-all"
>
  <h3 className="text-xl font-bold">
    👥 Users
  </h3>

  <p className="mt-2">
    Manage Platform Users
  </p>
</div>

<div
  onClick={() => navigate("/admin/courses")}
  className="bg-green-600 text-white p-6 rounded-2xl cursor-pointer hover:scale-105 transition-all"
>
  <h3 className="text-xl font-bold">
    📚 Courses
  </h3>

  <p className="mt-2">
    Manage Courses
  </p>
</div>

<div
  onClick={() => navigate("/admin/analytics")}
  className="bg-purple-600 text-white p-6 rounded-2xl cursor-pointer hover:scale-105 transition-all"
>
  <h3 className="text-xl font-bold">
    📈 Analytics
  </h3>

  <p className="mt-2">
    View Reports
  </p>
</div>

<div
  onClick={() => navigate("/admin/settings")}
  className="bg-red-500 text-white p-6 rounded-2xl cursor-pointer hover:scale-105 transition-all"
>
  <h3 className="text-xl font-bold">
    ⚙ Settings
  </h3>

  <p className="mt-2">
    Platform Settings
  </p>
</div>


  </div>
  <div
  onClick={() => navigate("/admin/notifications")}
  className="bg-indigo-600 text-white p-6 rounded-2xl cursor-pointer hover:scale-105 transition-all"
>
  <h3 className="text-xl font-bold">
    🔔 Notifications
  </h3>

  <p className="mt-2">
    Send Notifications
  </p>
</div>
</div>

);

}

export default AdminDashboard;