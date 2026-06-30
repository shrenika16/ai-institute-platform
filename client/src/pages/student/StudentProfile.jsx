import { useState } from "react";

import axios from "axios";

function StudentProfile() {

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [name, setName] = useState(
    storedUser?.name || ""
  );

  const [email, setEmail] = useState(
    storedUser?.email || ""
  );

  const [bio, setBio] = useState(
    storedUser?.bio || ""
  );

  const [phone, setPhone] = useState(
    storedUser?.phone || ""
  );

  const [department, setDepartment] =
    useState(
      storedUser?.department || ""
    );

  const [profileImage, setProfileImage] =
    useState(
      storedUser?.profileImage || ""
    );

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // UPDATE PROFILE
  const updateProfile = async () => {

    if (!name || !email) {

      return alert(
        "Name and Email required"
      );

    }

    try {

      setLoading(true);

      const res = await axios.put(

        `http://localhost:5000/api/users/update/${storedUser._id}`,

        {
          name,
          email,
          bio,
          phone,
          department,
          profileImage,
        }

      );

      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)

      );

      setEditing(false);

      alert(
        "Profile Updated Successfully ✅"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Profile Update Failed ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <img
            src={
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 object-cover"
          />

          <h2 className="text-3xl font-bold text-blue-600 mt-4">
            Student Profile
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your personal details
          </p>

        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* NAME */}
          <div>

            <label className="text-sm text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              disabled={!editing}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-blue-500"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled={!editing}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-blue-500"
            />

          </div>

          {/* PHONE */}
          <div>

            <label className="text-sm text-gray-600">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              disabled={!editing}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-blue-500"
            />

          </div>

          {/* DEPARTMENT */}
          <div>

            <label className="text-sm text-gray-600">
              Department
            </label>

            <input
              type="text"
              value={department}
              disabled={!editing}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-blue-500"
            />

          </div>

        </div>

        {/* PROFILE IMAGE */}
        <div className="mt-5">

          <label className="text-sm text-gray-600">
            Profile Image URL
          </label>

          <input
            type="text"
            value={profileImage}
            disabled={!editing}
            onChange={(e) =>
              setProfileImage(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-blue-500"
          />

        </div>

        {/* BIO */}
        <div className="mt-5">

          <label className="text-sm text-gray-600">
            Bio
          </label>

          <textarea
            rows="4"
            value={bio}
            disabled={!editing}
            onChange={(e) =>
              setBio(e.target.value)
            }
            className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-blue-500"
          />

        </div>

        {/* ROLE */}
        <div className="mt-5">

          <label className="text-sm text-gray-600">
            Role
          </label>

          <input
            value="Student"
            disabled
            className="w-full border p-3 rounded-xl mt-1 bg-gray-100"
          />

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">

          {!editing ? (

            <button
              onClick={() =>
                setEditing(true)
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Edit Profile
            </button>

          ) : (

            <>

              <button
                onClick={updateProfile}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
              >

                {loading
                  ? "Updating..."
                  : "Save Changes"}

              </button>

              <button
                onClick={() =>
                  setEditing(false)
                }
                className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl transition"
              >
                Cancel
              </button>

            </>

          )}

        </div>

      </div>

    </div>

  );

}

export default StudentProfile;