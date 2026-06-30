import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseLearningPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState(0);

  const [currentVideo, setCurrentVideo] =
    useState("");

  const [completedLessons, setCompletedLessons] =
  useState([]);

  // FETCH COURSE
  useEffect(() => {

    fetchCourse();

  }, []);

  const fetchCourse = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );

      console.log("COURSE DATA:", res.data);
      console.log("RESOURCES:", res.data.resources);

      setCourse(res.data);

      if (
        res.data.lessons &&
        res.data.lessons.length > 0
      ) {

        setCurrentVideo(
          res.data.lessons[0].videoUrl
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

 

  // COMPLETE COURSE
  const markCompleted = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/progress/complete-course",
        {
          studentId: user._id,
          courseId: id,
        }
      );

      setProgress(100);

      alert(
        "Course Completed Successfully 🎉"
      );

    } catch (error) {

      console.log(error);

    }

  };

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-blue-50">

        <h1 className="text-3xl font-bold text-blue-600">
          Loading Course...
        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        <button
          onClick={() => navigate(-1)}
          className="bg-white px-5 py-3 rounded-2xl shadow hover:bg-blue-100 transition"
        >
          ← Back
        </button>

        <div className="bg-white px-6 py-3 rounded-2xl shadow">

          <h2 className="font-bold text-blue-600">
            🎓 Learning Mode
          </h2>

        </div>

      </div>

      {/* COURSE HEADER */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold text-blue-600">
              {course?.title}
            </h1>

            <p className="text-gray-600 mt-5 text-lg leading-8">
              {course?.description}
            </p>

          </div>

          <div className="flex flex-col gap-4">

            <div className="bg-blue-100 text-blue-700 px-6 py-4 rounded-2xl text-center shadow">

              <h2 className="font-bold text-xl">
                {course?.duration}
              </h2>

              <p className="text-sm">
                Course Duration
              </p>

            </div>

            <div className="bg-green-100 text-green-700 px-6 py-4 rounded-2xl text-center shadow">

              <h2 className="font-bold text-xl">
                ₹ {course?.price}
              </h2>

              <p className="text-sm">
                Course Price
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* VIDEO SECTION */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          🎥 Course Video
        </h2>

        <div className="aspect-video rounded-3xl overflow-hidden shadow-lg">

          <iframe
            className="w-full h-full"
            src={currentVideo}
            title="Course Video"
            allowFullScreen
          ></iframe>

        </div>

        {/* LESSON LIST */}

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-4">
            📚 Lessons
          </h2>

          <div className="space-y-3">

            {course?.lessons?.length > 0 ? (

              course.lessons.map(
                (lesson, index) => (

                  <button
                    key={index}
                    onClick={async () => {

                            setCurrentVideo(
                              lesson.videoUrl
                            );

                            if (
                              !completedLessons.includes(index)
                            ) {

                              const updatedLessons = [
                                ...completedLessons,
                                index,
                              ];

                              setCompletedLessons(
                                updatedLessons
                              );

                              const percentage =
                                Math.round(
                                  (
                                    updatedLessons.length /
                                    course.lessons.length
                                  ) * 100
                                );

                              setProgress(
                                percentage
                              );

                              try {

                                const user =
                                  JSON.parse(
                                    localStorage.getItem("user")
                                  );

                                 await axios.post(
                                    "http://localhost:5000/api/progress/complete",
                                    {
                                      studentId: user._id,
                                      courseId: id,
                                      lessonIndex: index,
                                      totalLessons:
                                        course.lessons.length,
                                    }
                                  );

                              } catch (error) {

                                console.log(
                                  "Progress Update Error",
                                  error
                                );

                              }

                            }

                          }}                              
                            
                    className="w-full text-left bg-gray-100 hover:bg-blue-100 px-5 py-4 rounded-xl transition"
                  >

                    Lesson {index + 1} :
                    {" "}
                    {lesson.title}

                  </button>

                )
              )

            ) : (

              <p className="text-gray-500">

                No lessons available

              </p>

            )}

          </div>
        </div>

      </div>
          
          {/* NOTES SECTION */}

                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

                  <h2 className="text-3xl font-bold text-blue-600 mb-4">
                    📘 Course Notes
                  </h2>

                  <p className="text-gray-600 mb-5">
                    Download PDF notes and study material.
                  </p>

                  {course?.notesPdf ? (

                    <a
                      href={course.notesPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl inline-block transition"
                    >
                      Download Notes
                    </a>

                  ) : (

                    <p className="text-red-500">
                      Notes not available
                    </p>

                  )}

                </div>

                {/* RESOURCES SECTION */}

            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

              <h2 className="text-3xl font-bold text-green-600 mb-4">
                📚 Resources
              </h2>

              <p className="text-gray-600 mb-6">
                Useful links and learning materials.
              </p>

              {course?.resources?.length > 0 ? (

                <div className="space-y-4">

                  {course.resources.map(
                    (resource, index) => (

                      <a
                        key={index}
                        href={resource.link}
                        target="_blank"
                        rel="noreferrer"
                        className="block bg-green-50 hover:bg-green-100 p-4 rounded-xl transition"
                      >
                        🔗 {resource.title}
                      </a>

                    )
                  )}

                </div>

              ) : (

                <p className="text-red-500">
                  No resources available
                </p>

              )}

            </div>
      {/* PROGRESS SECTION */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-purple-600">
            📈 Course Progress
          </h2>

          <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-xl font-semibold">

            {progress}% Completed

          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">

          <div
            className="bg-purple-600 h-6 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>

        <button
          onClick={markCompleted}
          className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl transition"
        >

          Mark As Completed

        </button>

      </div>

    </div>

  );

}

export default CourseLearningPage;