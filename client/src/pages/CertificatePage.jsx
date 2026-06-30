import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CertificatePage() {

  const { courseId } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [course, setCourse] =
    useState(null);

  console.log("Course ID:", courseId);
  console.log("Course Data:", course);

  useEffect(() => {

    fetchCourse();

  }, []);

  useEffect(() => {

    console.log("Course Data:", course);

  }, [course]);

  const fetchCourse = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/courses/${courseId}`
      );

      setCourse(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
            AI Institute Platform
        </h2>

        <h1 className="text-4xl font-bold text-green-600">
          Certificate of Completion
        </h1>

        <p className="mt-6 text-xl">
          This certifies that
        </p>

        <h2 className="text-3xl font-bold mt-3">
          {user?.name}
        </h2>

        <div className="mt-4">

          <p className="text-xl text-gray-700">
            has successfully completed
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-3">
            {course?.title}
          </h2>

          <p className="mt-6 text-gray-500">
            Date: {new Date().toLocaleDateString()}
          </p>

          <button
            onClick={() => window.print()}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Download Certificate
          </button>
        
          <div className="mt-10 flex justify-between">

        <div>
            <div className="border-t border-black w-40"></div>
            <p className="mt-2">Student Signature</p>
        </div>

        <div>
            <div className="border-t border-black w-40"></div>
            <p className="mt-2">Institute Signature</p>
        </div>

        </div>
        
        </div>

      </div>

    </div>

  );

}

export default CertificatePage;