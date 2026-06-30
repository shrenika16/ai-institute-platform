const multer = require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

// ======================================

const storage =
  new CloudinaryStorage({

    cloudinary: cloudinary,

    params: async (
      req,
      file
    ) => {

      // IMAGE FILES

      if (
        file.mimetype.startsWith(
          "image"
        )
      ) {

        return {

          folder: "ai-platform/images",

          allowed_formats: [
            "jpg",
            "png",
            "jpeg",
          ],

        };

      }

      // PDF FILES

      return {

        folder: "ai-platform/pdfs",

        resource_type: "raw",

        format: "pdf",

      };

    },

  });

// ======================================

const upload =
  multer({
    storage,
  });

// ======================================

module.exports = upload;