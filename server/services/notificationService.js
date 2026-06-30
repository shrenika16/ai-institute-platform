import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const getNotifications = async (userId) => {
  const res = await axios.get(`${API}/${userId}`);
  return res.data;
};

export const createNotification = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const markAsRead = async (id) => {
  const res = await axios.put(`${API}/read/${id}`);
  return res.data;
};