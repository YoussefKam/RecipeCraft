// routes/otpRoutes.js
const express = require("express");
const router = express.Router();
const Otps = require("../models/OTP.model");
const randomstring = require("randomstring");
const sendEmail = require("../utils/sendEmails");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

router.post("/sendOTP", async (req, res) => {
  const generateOtp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  console.log(generateOtp);
  try {
    const { email } = req.query; // Generate a 6-digit OTP
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const newOTP = new Otps({ email, otp: generateOtp });
    await newOTP.save();

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: "Your OTP",
      message: `<p>Your OTP is: <strong>${generateOtp}</strong></p>`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
router.get("/verifyOTP", async (req, res, next) => {
  try {
    const { email, otp } = req.query;
    const existingOTP = await Otps.findOneAndDelete({ email, otp });

    if (existingOTP) {
      // OTP is valid, retrieve user from database
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      // Extract token from user model
      const token = user.token;

      // Respond with token and success message
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful", token });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/resetPassword/:userId", async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { userId } = req.params; // Extract userId from route params

    // Check if newPassword exists and is not an empty string
    if (!newPassword || newPassword.trim() === "") {
      return res
        .status(400)
        .json({ success: false, error: "Invalid newPassword" });
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
