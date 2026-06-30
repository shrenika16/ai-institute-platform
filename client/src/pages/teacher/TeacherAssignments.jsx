import { useState } from "react";
import axios from "axios";

function TeacherAssignments() {

  const teacher = JSON.parse(
    localStorage.getItem("user")
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
   const [pdfFile, setPdfFile] = useState(null);

   const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const submit = async () => {

    try {

      const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("dueDate", form.dueDate);
        formData.append("teacherId", teacher._id);
        
        formData.append(
          "courseId",
          "6a185d9dee3c2373668aff97"
        );
        
        if (pdfFile) {
          formData.append("assignmentPdf", pdfFile);
        }

        console.log("Selected PDF:", pdfFile);

        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        console.log(formData.get("assignmentPdf"));
        
        await axios.post(
          "http://localhost:5000/api/assignments/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

      alert("Assignment Created Successfully ✅");

      setForm({
        title: "",
        description: "",
        dueDate: "",
      });
      setPdfFile(null);

    } catch (error) {

      console.log(error);

      alert("Error Creating Assignment ❌");

    }

  };

  return (

    <div className="p-8">

      <h2 className="text-3xl font-bold mb-6">
        📝 Create Assignment
      </h2>

      <input
        type="text"
        name="title"
        value={form.title}
        placeholder="Assignment Title"
        onChange={handleChange}
        className="border p-3 w-full mt-3 rounded-lg"
      />

      <textarea
        name="description"
        value={form.description}
        placeholder="Assignment Description"
        onChange={handleChange}
        className="border p-3 w-full mt-3 rounded-lg"
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="border p-3 w-full mt-3 rounded-lg"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
        className="border p-3 w-full mt-3 rounded-lg"
      />
      
      <button
        onClick={submit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 mt-5 rounded-lg"
      >
        Create Assignment
      </button>

    </div>

  );

}

export default TeacherAssignments;