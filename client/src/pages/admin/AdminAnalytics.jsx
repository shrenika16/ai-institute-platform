import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
function AdminAnalytics() {

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [enrollmentChartData, setEnrollmentChartData] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchMonthlyUsers();
    fetchCourseEnrollments();
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
  const fetchMonthlyUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/monthly-users"
      );

      setMonthlyUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  const fetchCourseEnrollments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/course-enrollments"
      );

      setEnrollmentChartData(res.data);

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

  const pieData = [
    {
      name: "Students",
      value: totalStudents,
    },
    {
      name: "Teachers",
      value: totalTeachers,
    },
    {
      name: "Admins",
      value: users.filter(
        (user) => user.role === "admin"
      ).length,
    },
  ];

  const courseStatusData = [
    {
      name: "Published",
      value: courses.filter(
        (course) => course.status === "Published"
      ).length,
    },
    {
      name: "Draft",
      value: courses.filter(
        (course) => course.status === "Draft"
      ).length,
    },
  ];
  
  const revenueChartData = courses.map((course) => ({
    course: course.title,
    revenue: Number(course.price || 0),
  }));

  const averagePrice =
    courses.length > 0
      ? Math.floor(
          courses.reduce(
            (sum, course) =>
              sum + Number(course.price || 0),
            0
          ) / courses.length
        )
      : 0;

  const highestPrice =
    courses.length > 0
      ? Math.max(
          ...courses.map(
            (course) =>
              Number(course.price || 0)
          )
        )
      : 0;

  
  const courseChartData = [
    {
      name: "Published",
      value: courses.filter(
        (course) => course.status === "Published"
      ).length,
    },
    {
      name: "Draft",
      value: courses.filter(
        (course) => course.status === "Draft"
      ).length,
    },
  ];
  const userChartData = [
    {
      name: "Students",
      count: totalStudents,
    },
    {
      name: "Teachers",
      count: totalTeachers,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
  ];
  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Admin Analytics
      </h1>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Students
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {totalStudents}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Teachers
          </h3>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {totalTeachers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Avg Course Price
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            ₹ {averagePrice}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Highest Price
          </h3>

          <p className="text-4xl font-bold text-red-500 mt-3">
            ₹ {highestPrice}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Total Courses
          </h3>

          <p className="text-4xl font-bold text-orange-500 mt-3">
            {courses.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Total Revenue
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            ₹ {courses.reduce((sum, course) =>
              sum + Number(course.price || 0), 0)}
          </p>
        </div>
      </div>

      {/* Analytics Section */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Student Growth
          </h2>

          <div className="text-6xl font-bold text-green-600">
            {totalStudents}
          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Teacher Growth
          </h2>

          <div className="text-6xl font-bold text-purple-600">
            {totalTeachers}
          </div>

        </div>

      </div>
      
      {/* Revenue Analytics */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">

          <h3 className="text-lg">
            Total Revenue
          </h3>

          <p className="text-4xl font-bold mt-3">
            ₹ {
              courses.reduce(
                (sum, course) =>
                  sum + Number(course.price || 0),
                0
              )
            }
          </p>

        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">

          <h3 className="text-lg">
            Published Courses
          </h3>

          <p className="text-4xl font-bold mt-3">
            {
              courses.filter(
                (course) =>
                  course.status === "Published"
              ).length
            }
          </p>

        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-6 rounded-2xl shadow-lg">

          <h3 className="text-lg">
            Draft Courses
          </h3>

          <p className="text-4xl font-bold mt-3">
            {
              courses.filter(
                (course) =>
                  course.status === "Draft"
              ).length
            }
          </p>

        </div>

      </div>

      {/* Recent Users */}

      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Recent Users
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Name
              </th>

              <th className="text-left p-3">
                Email
              </th>

              <th className="text-left p-3">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {users.slice(-5).reverse().map((user) => (

              <tr
                key={user._id}
                className="border-b"
              >

                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Platform Health
      </h2>

      <div className="space-y-3">

        <div>👨‍🎓 Students : {totalStudents}</div>

        <div>👨‍🏫 Teachers : {totalTeachers}</div>

        <div>📚 Courses : {courses.length}</div>

        <div>
          💰 Revenue : ₹ {
            courses.reduce(
              (sum, course) =>
                sum + Number(course.price || 0),
              0
            )
          }
        </div>

      </div>
    
          {/* Course Status Pie Chart */}

          <div className="bg-white p-6 rounded-2xl shadow mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Course Status
            </h2>

            <ResponsiveContainer width="100%" height={350}>

              <PieChart>

                <Pie
                  data={courseStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {courseStatusData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Revenue Chart */}

          <div className="bg-white p-6 rounded-2xl shadow mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Course Revenue
            </h2>

            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={revenueChartData}>

                <CartesianGrid strokeDasharray="3 3" />

               <XAxis dataKey="course" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="revenue"
                  fill="#10B981"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* USERS CHART */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Users Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={userChartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* COURSE CHART */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Course Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={courseChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {courseChartData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>
               {/* Enrollment Analytics */}

                <div className="bg-white p-6 rounded-2xl shadow mt-8">

                  <h2 className="text-2xl font-bold mb-5">
                    Course Enrollment Analytics
                  </h2>

                  <ResponsiveContainer width="100%" height={350}>

                    <BarChart data={enrollmentChartData}>
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis
                        dataKey="course"
                        angle={-15}
                        textAnchor="end"
                        interval={0}
                      />

                      <YAxis />

                      <Tooltip />

                      <Legend />

                      <Bar
                        dataKey="students"
                        fill="#3B82F6"
                        radius={[8, 8, 0, 0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>
              <div className="bg-white p-6 rounded-2xl shadow mt-8">

              <h2 className="text-2xl font-bold mb-5">
                Monthly User Registrations
              </h2>

              <ResponsiveContainer width="100%" height={350}>

                <LineChart data={monthlyUsers}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3B82F6"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>
          <div className="bg-white p-6 rounded-2xl shadow mt-8">

            <h2 className="text-2xl font-bold mb-6">
              User Distribution
            </h2>

            <ResponsiveContainer width="100%" height={350}>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>
      </div>
    </div>
    </div>
    
  );
  

}

export default AdminAnalytics;