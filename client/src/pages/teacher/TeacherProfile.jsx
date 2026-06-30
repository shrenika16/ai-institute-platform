import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherProfile() {

  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [name, setName] = useState(
    storedUser?.name || ""
  );

  const [email, setEmail] = useState(
    storedUser?.email || ""
  );

  const [department, setDepartment] =
    useState(
      storedUser?.department || ""
    );

  const [bio, setBio] = useState(
    storedUser?.bio || ""
  );

  // PROFILE IMAGE
  const [profileImage, setProfileImage] =
    useState(null);

  const [preview, setPreview] =
    useState(
      storedUser?.profileImage || ""
    );

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // IMAGE CHANGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setProfileImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  // UPDATE PROFILE
  const handleUpdate =
    async () => {

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        formData.append(
          "email",
          email
        );

        formData.append(
          "department",
          department
        );

        formData.append(
          "bio",
          bio
        );

        // IMAGE
        if (profileImage) {

          formData.append(
            "profileImage",
            profileImage
          );

        }

        const res = await axios.put(

          `http://localhost:5000/api/users/${storedUser._id}`,

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }

        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert(
          "Profile Updated Successfully"
        );

        setEditing(false);

      } catch (error) {

        console.log(error);

        alert(
          "Profile Update Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-44 relative">

          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">

            {/* PROFILE IMAGE */}

            {preview ? (

              <img
                src={preview}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
              />

            ) : (

              <div className="w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center text-4xl font-bold text-indigo-700 border-4 border-white">

                {name?.charAt(0)?.toUpperCase()}

              </div>

            )}

          </div>

        </div>

        {/* BODY */}

        <div className="pt-20 px-8 pb-8">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-gray-800">
              👨‍🏫 Teacher Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your profile information
            </p>

          </div>

          <div className="space-y-5">

            {/* PROFILE IMAGE */}

            {editing && (

              <div>

                <label className="font-semibold text-gray-600">
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-2 border rounded-2xl px-4 py-3"
                />

              </div>

            )}

            {/* NAME */}

            <div>

              <label className="font-semibold text-gray-600">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                disabled={!editing}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className={`w-full mt-2 border rounded-2xl px-4 py-3 ${
                  editing
                    ? "focus:border-indigo-500 outline-none"
                    : "bg-gray-100"
                }`}
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="font-semibold text-gray-600">
                Email
              </label>

              <input
                type="email"
                value={email}
                disabled={!editing}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className={`w-full mt-2 border rounded-2xl px-4 py-3 ${
                  editing
                    ? "focus:border-indigo-500 outline-none"
                    : "bg-gray-100"
                }`}
              />

            </div>

            {/* DEPARTMENT */}

            <div>

              <label className="font-semibold text-gray-600">
                Department
              </label>

              <input
                type="text"
                value={department}
                disabled={!editing}
                onChange={(e) =>
                  setDepartment(
                    e.target.value
                  )
                }
                className={`w-full mt-2 border rounded-2xl px-4 py-3 ${
                  editing
                    ? "focus:border-indigo-500 outline-none"
                    : "bg-gray-100"
                }`}
              />

            </div>

            {/* BIO */}

            <div>

              <label className="font-semibold text-gray-600">
                Bio
              </label>

              <textarea
                rows="4"
                value={bio}
                disabled={!editing}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                className={`w-full mt-2 border rounded-2xl px-4 py-3 ${
                  editing
                    ? "focus:border-indigo-500 outline-none"
                    : "bg-gray-100"
                }`}
              />

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 mt-8">

            {!editing ? (

              <button
                onClick={() =>
                  setEditing(true)
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold"
              >
                Edit Profile
              </button>

            ) : (

              <>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold"
                >

                  {loading
                    ? "Updating..."
                    : "Save Changes"}

                </button>

                <button
                  onClick={() =>
                    setEditing(false)
                  }
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-2xl font-semibold"
                >
                  Cancel
                </button>
              </>

            )}

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default TeacherProfile;