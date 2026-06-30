import { useState } from "react";

function AdminSettings() {

const [siteName, setSiteName] =
useState("AI Institute Platform");

const [contactEmail, setContactEmail] =
useState("[admin@gmail.com](mailto:admin@gmail.com)");

const [phone, setPhone] =
useState("+91 9876543210");

const [maintenanceMode, setMaintenanceMode] =
useState(false);

const [allowRegistration, setAllowRegistration] =
useState(true);

const [emailNotifications, setEmailNotifications] =
useState(true);

const [password, setPassword] =
useState("");

const [confirmPassword, setConfirmPassword] =
useState("");

const saveSettings = () => {
alert("Settings Saved Successfully");
};

return (


<div className="min-h-screen bg-gray-100 p-8">

  <h1 className="text-4xl font-bold text-blue-600 mb-8">
    Admin Settings
  </h1>

  <div className="grid md:grid-cols-4 gap-5 mb-8">

    <div className="bg-green-50 p-5 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Website Status
      </h3>

      <p className="text-3xl font-bold text-green-600 mt-2">
        Active
      </p>
    </div>

    <div className="bg-blue-50 p-5 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Total Users
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-2">
        6
      </p>
    </div>

    <div className="bg-purple-50 p-5 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Total Courses
      </h3>

      <p className="text-3xl font-bold text-purple-600 mt-2">
        5
      </p>
    </div>

    <div className="bg-red-50 p-5 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Maintenance
      </h3>

      <p className="text-3xl font-bold text-red-500 mt-2">
        {maintenanceMode ? "ON" : "OFF"}
      </p>
    </div>

  </div>

  <div className="bg-white p-8 rounded-3xl shadow-lg">

    <h2 className="text-2xl font-bold mb-6">
      Website Information
    </h2>

    <div className="mb-5">

      <label className="block font-semibold mb-2">
        Website Name
      </label>

      <input
        type="text"
        value={siteName}
        onChange={(e) =>
          setSiteName(e.target.value)
        }
        className="w-full border p-3 rounded-xl"
      />

    </div>

    <div className="mb-5">

      <label className="block font-semibold mb-2">
        Contact Email
      </label>

      <input
        type="email"
        value={contactEmail}
        onChange={(e) =>
          setContactEmail(e.target.value)
        }
        className="w-full border p-3 rounded-xl"
      />

    </div>

    <div className="mb-8">

      <label className="block font-semibold mb-2">
        Support Phone
      </label>

      <input
        type="text"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full border p-3 rounded-xl"
      />

    </div>

    <h2 className="text-2xl font-bold mb-6">
      System Settings
    </h2>

    <div className="space-y-4 mb-8">

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={maintenanceMode}
          onChange={() =>
            setMaintenanceMode(
              !maintenanceMode
            )
          }
        />

        <label>
          Maintenance Mode
        </label>

      </div>

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={allowRegistration}
          onChange={() =>
            setAllowRegistration(
              !allowRegistration
            )
          }
        />

        <label>
          Allow Registration
        </label>

      </div>

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() =>
            setEmailNotifications(
              !emailNotifications
            )
          }
        />

        <label>
          Email Notifications
        </label>

      </div>

    </div>

    <h2 className="text-2xl font-bold mb-6">
      Security Settings
    </h2>

    <div className="mb-4">

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-xl"
      />

    </div>

    <div className="mb-8">

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-xl"
      />

    </div>

    <button
      onClick={saveSettings}
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
    >
      💾 Save Settings
    </button>

  </div>

</div>


);

}

export default AdminSettings;