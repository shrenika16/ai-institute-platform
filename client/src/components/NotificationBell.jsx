import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead,
} from "../services/notificationService";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const data = await getNotifications(user._id);

    setNotifications(data);

  } catch (error) {
    console.log(error);
  }
};

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="text-2xl"
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl p-4 z-50">
          <h3 className="font-bold mb-3">
            Notifications
          </h3>

          {notifications.length === 0 ? (
            <p>No Notifications</p>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                className="border-b py-2"
              >
                <h4 className="font-semibold">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600">
                  {item.message}
                </p>

                {!item.isRead && (
                  <button
                    onClick={() =>
                      handleRead(item._id)
                    }
                    className="text-blue-500 text-sm mt-1"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;