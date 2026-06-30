const Assignment = require(
  "../models/Assignment"
);

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// =================================================
// CREATE ASSIGNMENT
// =================================================

exports.createAssignment =
  async (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
    const {
      title,
      description,
      dueDate,
      teacherId,
      courseId,
    } = req.body;

      // VALIDATION
      if (
        !title?.trim() ||
        !description?.trim() ||
        !dueDate
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all fields",

        });

      }
      let assignmentPdf = "";

          if (req.file) {

            const uploadResult = await new Promise((resolve, reject) => {

              const stream =
                cloudinary.uploader.upload_stream(

                  {
                    folder: "assignment-pdfs",
                    resource_type: "raw",
                  },

                  (error, result) => {

                    if (error) reject(error);
                    else resolve(result);

                  }

                );

              streamifier.createReadStream(req.file.buffer).pipe(stream);

            });

            assignmentPdf = uploadResult.secure_url;

          }
      // CREATE
      const assignment =
        await Assignment.create({

          title,

          description,

          assignmentPdf,

          dueDate,

          teacherId,

          courseId,

        });
      res.status(201).json({

        success: true,

        message:
          "Assignment Created Successfully",

        assignment,

      });

    } catch (error) {

      console.log(
        "CREATE ASSIGNMENT ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  };



// =================================================
// GET ALL ASSIGNMENTS
// =================================================

exports.getAssignments =
  async (req, res) => {

    try {

      const assignments =
        await Assignment.find()

          .populate(
            "teacherId",
            "name email"
          )

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        assignments,

      });

    } catch (error) {

      console.log(
        "GET ASSIGNMENTS ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  };



// =================================================
// GET SINGLE ASSIGNMENT
// =================================================

exports.getSingleAssignment =
  async (req, res) => {

    try {

      const assignment =
        await Assignment.findById(
          req.params.id
        ).populate(
          "teacherId",
          "name email"
        );

      if (!assignment) {

        return res.status(404).json({

          success: false,

          message:
            "Assignment Not Found",

        });

      }

      res.status(200).json({

        success: true,

        assignment,

      });

    } catch (error) {

      console.log(
        "GET SINGLE ASSIGNMENT ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  };



// =================================================
// UPDATE ASSIGNMENT
// =================================================

exports.updateAssignment =
  async (req, res) => {

    try {

      const updatedAssignment =
        await Assignment.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      if (!updatedAssignment) {

        return res.status(404).json({

          success: false,

          message:
            "Assignment Not Found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Assignment Updated Successfully",

        updatedAssignment,

      });

    } catch (error) {

      console.log(
        "UPDATE ASSIGNMENT ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  };



// =================================================
// DELETE ASSIGNMENT
// =================================================

exports.deleteAssignment =
  async (req, res) => {

    try {

      const deletedAssignment =
        await Assignment.findByIdAndDelete(
          req.params.id
        );

      if (!deletedAssignment) {

        return res.status(404).json({

          success: false,

          message:
            "Assignment Not Found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Assignment Deleted Successfully",

      });

    } catch (error) {

      console.log(
        "DELETE ASSIGNMENT ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  };
