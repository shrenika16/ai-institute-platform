const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");

const {
getUsers,
getUserById,
updateUser,
deleteUser,
updateCourseProgress,
} = require("../controllers/userController");

// GET ALL USERS
router.get("/", getUsers);

// GET SINGLE USER
router.get("/:id", getUserById);

// UPDATE USER PROFILE + IMAGE
router.put(
"/:id",
upload.single("profileImage"),
updateUser
);

// UPDATE COURSE PROGRESS
router.put(
  "/progress",
  updateCourseProgress
);

// DELETE USER
router.delete(
"/:id",
deleteUser
);

module.exports = router;