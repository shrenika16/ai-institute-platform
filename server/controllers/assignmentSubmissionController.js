const AssignmentSubmission = require("../models/AssignmentSubmission");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// ===============================================
// SUBMIT ASSIGNMENT
// ===============================================

exports.submitAssignment = async (req, res) => {

  try {

    const {
      assignmentId,
      studentId,
    } = req.body;

    if (!assignmentId || !studentId) {

      return res.status(400).json({
        success: false,
        message: "Assignment ID and Student ID are required",
      });

    }

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please Upload PDF",
      });

    }

    // Check if student already submitted this assignment

      const existingSubmission =
        await AssignmentSubmission.findOne({

          assignmentId,
          studentId,

        });

      if (existingSubmission) {

        return res.status(400).json({

          success: false,

          message: "You have already submitted this assignment.",

        });

      }
    // ======================================
    // Upload PDF to Cloudinary
    // ======================================

    const uploadResult = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(

        {
          folder: "student-submissions",
          resource_type: "raw",
        },

        (error, result) => {

          if (error) reject(error);
          else resolve(result);

        }

      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(stream);

    });

    // ======================================
    // Save in MongoDB
    // ======================================

    const submission =
      await AssignmentSubmission.create({

        assignmentId,

        studentId,

        submissionPdf:
          uploadResult.secure_url,

      });

    res.status(201).json({

      success: true,

      message: "Assignment Submitted Successfully",

      submission,

    });

  } catch (error) {

    console.log("SUBMISSION ERROR:", error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ===============================================
// GET ALL SUBMISSIONS
// ===============================================

exports.getAllSubmissions = async (req, res) => {

  try {

    const submissions =
      await AssignmentSubmission.find()

        .populate("studentId", "name email")

        .populate("assignmentId", "title")

        .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      submissions,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ===============================================
// UPDATE MARKS + FEEDBACK
// ===============================================

exports.updateSubmissionStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const {

      marks,

      feedback,

      status,

    } = req.body;

    const submission =
      await AssignmentSubmission.findByIdAndUpdate(

        id,

        {

          marks,

          feedback,

          status,

        },

        {

          new: true,

        }

      );

    res.status(200).json({

      success: true,

      message: "Submission Updated Successfully",

      submission,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ===============================================
// STUDENT SUBMISSIONS
// ===============================================

exports.getStudentSubmissions = async (req, res) => {

  try {

    const { studentId } = req.params;

    const submissions =
      await AssignmentSubmission.find({

        studentId,

      })

      .populate("assignmentId", "title");

    res.status(200).json({

      success: true,

      submissions,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};
// =================================================
// UPDATE SUBMISSION
// =================================================

exports.updateSubmission =
async (req, res) => {

  try {

    const { id } = req.params;

    const submission =
      await AssignmentSubmission.findById(id);

    if (!submission) {

      return res.status(404).json({

        success: false,

        message: "Submission Not Found",

      });

    }

    if (req.file) {

          const uploadResult = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(

              {
                folder: "student-submissions",
                resource_type: "raw",
              },

              (error, result) => {

                if (error) reject(error);
                else resolve(result);

              }

            );

            streamifier
              .createReadStream(req.file.buffer)
              .pipe(stream);

          });

          submission.submissionPdf =
            uploadResult.secure_url;

        }
        submission.status = "Pending";
        await submission.save();

    res.status(200).json({

      success: true,

      message: "Submission Updated Successfully",

      submission,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};