import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {

  const [search, setSearch] =
    useState("");

  const [courses, setCourses] =
    useState([]);

  // =====================================
  // FETCH COURSES
  // =====================================

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/courses"
          );

        setCourses(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  // =====================================
  // SEARCH FILTER
  // =====================================

  const filtered =
    courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-24 px-6 text-white text-center">

        <h1 className="text-5xl font-bold">
          Explore Our Courses
        </h1>

        <p className="mt-6 text-xl text-blue-100">
          Learn job-ready skills with AI-powered learning
        </p>

        {/* SEARCH */}

        <div className="mt-10 flex justify-center">

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full max-w-xl px-6 py-4 rounded-2xl text-black shadow-lg outline-none"
          />

        </div>

      </section>

      {/* COURSE SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {filtered.map((course) => (

            <div
              key={course._id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* IMAGE */}

              <div className="relative">

                <img
                  src={
                    course.thumbnail ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />

                {/* BADGE */}

                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-4 py-1 rounded-full shadow">

                  Popular

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">

                  {course.title}

                </h2>

                <p className="mt-3 text-gray-500 line-clamp-2">

                  {course.description}

                </p>

                {/* INSTRUCTOR */}

                <div className="flex items-center gap-3 mt-5">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="teacher"
                    className="w-10 h-10 rounded-full"
                  />

                  <div>

                    <p className="font-semibold text-gray-700">

                      {course.instructor ||
                        "Instructor"}

                    </p>

                    <p className="text-sm text-gray-500">

                      {course.category ||
                        "Development"}

                    </p>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="flex justify-between items-center mt-6 text-sm text-gray-600">

                  <p>
                    ⏳ {course.duration}
                  </p>

                  <p>
                    ⭐ 4.8
                  </p>

                </div>

                {/* PRICE */}

                <div className="mt-5 flex justify-between items-center">

                  <p className="text-2xl font-bold text-blue-600">

                    ₹ {course.price}

                  </p>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition">

                    Enroll

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  );

}

export default Courses;