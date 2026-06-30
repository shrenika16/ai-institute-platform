const express = require("express");

const router = express.Router();

const {
  getNotifications,
  createNotification,
  markAsRead,
} = require("../controllers/NotificationController");

// Get notifications of a user
router.get("/:userId", getNotifications);

// Create notification
router.post("/", createNotification);

// Mark notification as read
router.put("/read/:id", markAsRead);

module.exports = router;