const Notification = require("../models/Notification");

// Get notifications for a user
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      receiver: userId,
    }).sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// Create Notification
const createNotification = async (req, res) => {

  try {

    const {
      title,
      message,
      receiver,
      receiverType,
    } = req.body;

    const notification = await Notification.create({
      title,
      message,
      receiver,
      receiverType,
    });

    res.status(201).json(notification);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// Mark notification as read
const markAsRead = async (req, res) => {

  try {

    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    res.json(notification);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
};