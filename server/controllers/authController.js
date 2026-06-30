const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");




// ==========================
// REGISTER USER
// ==========================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex");

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        verificationToken,
        isVerified: false,
      });
      const verifyUrl = `http://localhost:5000/api/auth/verify/${verificationToken}`;
      await sendEmail(
        user.email,
        "Verify Your Account",
        `Click this link to verify your account:

      ${verifyUrl}`
      );

    // remove password before sending response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      message: "User Registered Successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// LOGIN USER
// ==========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // safe user response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
    };

    res.status(200).json({
      message: "Login Successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("Reset Link:", resetUrl);

    res.json({
      success: true,
      message: "Reset link generated",
      resetToken,
      resetUrl,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
    });

    console.log("FOUND USER =", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    console.log("AFTER SAVE =", user);

    res.json({
      message: "Email Verified Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyUser,

};