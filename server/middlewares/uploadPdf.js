const multer = require("multer");

const storage = multer.memoryStorage();

const uploadPdf = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

module.exports = uploadPdf;