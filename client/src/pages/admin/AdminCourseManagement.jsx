import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminCourseManagement() {

const [courses, setCourses] = useState([]);
const [showModal, setShowModal] = useState(false);
const [thumbnail, setThumbnail] = useState(null);
const [viewCourse, setViewCourse] = useState(null);

const [newCourse, setNewCourse] = useState({
  title: "",
  description: "",
  duration: "",
  instructor: "",
  price: "",
  category: "",
  level: "",
  status: "Draft",
  studentsCount: 0,
});
const [editCourseId, setEditCourseId] = useState(null);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
fetchCourses();

}, []);

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

const deleteCourse = async (id) => {


const confirmDelete =
  window.confirm(
    "Are you sure you want to delete this course?"
  );

if (!confirmDelete) return;

try {

  await axios.delete(
    `http://localhost:5000/api/courses/${id}`
  );

  fetchCourses();
  toast.success("Course Deleted Successfully");

} catch (error) {
  
  console.log(error);

   toast.error("Error Deleting Course");

}


};
const addCourse = async () => {

  try {

    const formData = new FormData();

    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    formData.append("duration", newCourse.duration);
    formData.append("instructor", newCourse.instructor);
    formData.append("price", newCourse.price);
    formData.append("category", newCourse.category);
    formData.append("level", newCourse.level);
    formData.append("status", newCourse.status);
    formData.append(
    "studentsCount",
        newCourse.studentsCount
      );

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    await axios.post(
      "http://localhost:5000/api/courses/add",
      formData
    );

    fetchCourses();

    setShowModal(false);

    setNewCourse({
      title: "",
      description: "",
      duration: "",
      instructor: "",
      price: "",
      category: "",
      level: "",
      status: "Draft",
    });

    setThumbnail(null);

   toast.success("Course Added Successfully");

  } catch (error) {

    console.log(error);

    toast.error("Error Adding Course");

  }

};
const updateCourse = async () => {

  try {

    const formData = new FormData();

    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    formData.append("duration", newCourse.duration);
    formData.append("instructor", newCourse.instructor);
    formData.append("price", newCourse.price);
    formData.append("category", newCourse.category);
    formData.append("level", newCourse.level);
    formData.append("status", newCourse.status);
    formData.append(
        "studentsCount",
        newCourse.studentsCount
    );

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    await axios.put(
      `http://localhost:5000/api/courses/${editCourseId}`,
      formData
    );

    fetchCourses();

    setShowModal(false);

    setEditCourseId(null);

    setNewCourse({
      title: "",
      description: "",
      duration: "",
      instructor: "",
      price: "",
      category: "",
      level: "",
      status: "Draft",
      
    });

    setThumbnail(null);

    toast.success("Course Updated Successfully");

  } catch (error) {

    console.log(error);

   toast.error("Error Updating Course");

  }

};
const totalCourses = courses.length;

const freeCourses = courses.filter(
  (course) => Number(course.price) === 0
).length;

const paidCourses = courses.filter(
  (course) => Number(course.price) > 0
).length;

const averagePrice =
  totalCourses > 0
    ? Math.round(
        courses.reduce(
          (sum, course) =>
            sum + Number(course.price),
          0
        ) / totalCourses
      )
    : 0;

const highestPrice =
  totalCourses > 0
    ? Math.max(
        ...courses.map((course) =>
          Number(course.price)
        )
      )
    : 0;
const totalEnrollments =
  courses.reduce(
    (sum, course) =>
      sum +
      (course.enrolledStudents
        ? course.enrolledStudents.length
        : 0),
    0
  );

const totalStudents = courses.reduce(
  (sum, course) =>
    sum + Number(course.studentsCount || 0),
  0
);

const totalRevenue = courses.reduce(
  (sum, course) =>
    sum +
    Number(course.price || 0) *
      Number(course.studentsCount || 0),
  0
);
    
return (


<div className="min-h-screen bg-gray-100 p-8">

  <div className="flex items-center justify-between mb-8 gap-5">
    <div className="mb-6">

        <div className="w-64">
          <input
            type="text"
            placeholder="Search Course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>

      </div>

    <h1 className="text-4xl font-bold text-blue-600">
      Course Management
    </h1>

    <button
       onClick={() => {

            setEditCourseId(null);

            setNewCourse({
              title: "",
              description: "",
              duration: "",
              instructor: "",
              price: "",
              category: "",
              level: "",
              status: "Draft",
            });

            setShowModal(true);

          }}
        className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
        + Add Course
    </button>
  </div>

  {/* TOTAL COURSES CARD */}

  <div className="grid md:grid-cols-5 gap-4 mb-8">

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">Total Courses</h3>
    <p className="text-3xl font-bold text-blue-600 mt-2">
      {totalCourses}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">Free Courses</h3>
    <p className="text-3xl font-bold text-green-600 mt-2">
      {freeCourses}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">Paid Courses</h3>
    <p className="text-3xl font-bold text-red-500 mt-2">
      {paidCourses}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">Average Price</h3>
    <p className="text-3xl font-bold text-purple-600 mt-2">
      ₹ {averagePrice}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">Highest Price</h3>
    <p className="text-3xl font-bold text-orange-500 mt-2">
      ₹ {highestPrice}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">
      Total Enrollments
    </h3>

    <p className="text-3xl font-bold text-indigo-600 mt-2">
      {totalEnrollments}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">
      Total Students
    </h3>
    <p className="text-3xl font-bold text-indigo-600 mt-2">
      {totalStudents}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">
      Total Revenue
    </h3>
    <p className="text-3xl font-bold text-green-600 mt-2">
      ₹ {totalRevenue}
    </p>
  </div>

</div>
  {/* EMPTY STATE */}

  {courses.length === 0 && (

    <div className="bg-white p-8 rounded-xl shadow text-center">

      <h2 className="text-2xl font-bold text-gray-500">
        No Courses Found
      </h2>

    </div>

  )}

<div className="bg-white rounded-2xl shadow overflow-hidden">

  <table className="w-full text-sm">

    <thead className="bg-blue-600 text-white">

      <tr>

        <th className="p-4 text-left">
          Course
        </th>

        <th className="p-4 text-left">
          Instructor
        </th>

        <th className="p-4 text-left">
          Category
        </th>

        <th className="p-4 text-left">
          Price
        </th>

        <th className="p-4 text-left">
          Status
        </th>
        
        <th className="p-4 text-left">
          Students
        </th>

        <th className="p-4 text-left">
          Revenue
        </th>

        <th className="p-4 text-left">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>

      {courses
        .filter((course) =>
          course.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
        )
        .map((course) => (

          <tr
            key={course._id}
            className="border-b hover:bg-gray-50"
          >

            <td className="p-4">

              <div className="flex items-center gap-3">

                {course.thumbnail && (

                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                )}

                <div>

                  <h3 className="font-semibold">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {course.level}
                  </p>

                </div>

              </div>

            </td>

            <td className="p-4">
              {course.instructor}
            </td>

            <td className="p-4">
              {course.category}
            </td>

            <td className="p-4 font-bold text-green-600">
              ₹ {course.price}
            </td>
           <td className="p-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                👨‍🎓 {course.enrolledStudents?.length || 0}
              </span>
            </td>

            <td className="p-4">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  course.status === "Published"
                    ? "bg-green-500"
                    : course.status === "Draft"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {course.status}
              </span>
            </td>
            <td className="p-4">
              👨‍🎓 {course.studentsCount}
            </td>
            
            <td className="p-4 font-bold text-green-600">
              ₹{" "}
              {Number(course.price || 0) *
                Number(course.studentsCount || 0)}
            </td>
            
            <td className="p-4">

              <div className="flex gap-2">

                <button
                  onClick={() => {

                    setShowModal(true);

                    setEditCourseId(course._id);

                    setNewCourse({
                      title: course.title || "",
                      description: course.description || "",
                      duration: course.duration || "",
                      instructor: course.instructor || "",
                      price: course.price || "",
                      category: course.category || "",
                      level: course.level || "",
                      status: course.status || "Draft",
                      studentsCount:
                                    course.studentsCount || 0,
                    });

                  }}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                >
                  Edit
                </button>
                
                <button
                  onClick={() => setViewCourse(course)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    deleteCourse(course._id)
                  }
                  className="bg-red-500 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

    </tbody>

  </table>

</div>
    {showModal && (

  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

    <div className="bg-white p-6 rounded-2xl w-[500px]">

      <h2 className="text-2xl font-bold mb-5">
        {editCourseId ? "Edit Course" : "Add New Course"}
      </h2>

      <input
        type="text"
        placeholder="Course Title"
        className="w-full border p-3 rounded-lg mb-3"
        value={newCourse.title}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            title: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        className="w-full border p-3 rounded-lg mb-3"
        value={newCourse.description}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            description: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Instructor"
        className="w-full border p-3 rounded-lg mb-3"
        value={newCourse.instructor}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            instructor: e.target.value,
          })
        }
      />
        <input
          type="text"
          placeholder="Duration"
          className="w-full border p-3 rounded-lg mb-3"
          value={newCourse.duration}
          onChange={(e) =>
            setNewCourse({
              ...newCourse,
              duration: e.target.value,
            })
          }
        />
      <input
        type="number"
        placeholder="Price"
        className="w-full border p-3 rounded-lg mb-5"
        value={newCourse.price}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            price: e.target.value,
          })
        }
      />
      <input
          type="text"
          placeholder="Category"
          className="w-full border p-3 rounded-lg mb-3"
          value={newCourse.category}
          onChange={(e) =>
            setNewCourse({
              ...newCourse,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Students Count"
          className="w-full border p-3 rounded-lg mb-3"
          value={newCourse.studentsCount}
          onChange={(e) =>
            setNewCourse({
              ...newCourse,
              studentsCount: e.target.value,
            })
          }
        />
        <select
            className="w-full border p-3 rounded-lg mb-3"
            value={newCourse.status || "Draft"}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                status: e.target.value,
              })
            }
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
        </select>
        <input
          type="file"
          className="w-full border p-3 rounded-lg mb-3"
          onChange={(e) =>
            setThumbnail(e.target.files[0])
          }
        />
      <div className="flex gap-3">

       <button
            onClick={
              editCourseId
                ? updateCourse
                : addCourse
            }
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            {editCourseId ? "Update Course" : "Save Course"}
        </button>

        <button
            onClick={() => {

              setShowModal(false);

              setEditCourseId(null);

              setThumbnail(null);
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
        </button>

      </div>

    </div>

  </div>

)}
{viewCourse && (

<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

  <div className="bg-white p-6 rounded-2xl w-[600px]">

    <h2 className="text-3xl font-bold mb-5 text-blue-600">
      Course Details
    </h2>

    {viewCourse.thumbnail && (
      <img
        src={viewCourse.thumbnail}
        alt={viewCourse.title}
        className="w-full h-60 object-cover rounded-xl mb-5"
      />
    )}

    <p><b>Title:</b> {viewCourse.title}</p>

    <p className="mt-2">
      <b>Description:</b> {viewCourse.description}
    </p>

    <p className="mt-2">
      <b>Instructor:</b> {viewCourse.instructor}
    </p>

    <p className="mt-2">
      <b>Duration:</b> {viewCourse.duration}
    </p>

    <p className="mt-2">
      <b>Category:</b> {viewCourse.category}
    </p>

    <p className="mt-2">
      <b>Level:</b> {viewCourse.level}
    </p>
    <p className="mt-2">
        <b>Students:</b>{" "}
        {viewCourse.studentsCount}
    </p>

    <p className="mt-2 text-green-600 font-bold">
      ₹ {viewCourse.price}
    </p>
    
    <p className="mt-2">
      <b>Enrolled Students:</b>{" "}
      {
        viewCourse.enrolledStudents?.length || 0
      }
    </p>
    
    <button
      onClick={() => setViewCourse(null)}
      className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg"
    >
      Close
    </button>

  </div>

</div>

)}
</div>


);

}

export default AdminCourseManagement;