import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const getNotifications = async (userId) => {
  const res = await axios.get(`${API}/${userId}`);
  return res.data;
};

export const markAsRead = async (notificationId) => {
  const res = await axios.put(`${API}/read/${notificationId}`);
  return res.data;
};