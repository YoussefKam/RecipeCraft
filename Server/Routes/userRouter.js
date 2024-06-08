const express = require("express");
const router = express.Router();
router.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const verifyToken = require("../Middlewares/auth.middleware");

// Set up cookie parser middleware
router.use(cookieParser());

// Get all users
router.get("/", verifyToken, async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const perPage = parseInt(req.query.perPage) || 3; // Default to 3 users per page
    // const skipCount = (page - 1) * perPage;

    // getting all users
    const users = await User.find({}, { __v: 0, password: 0 }); // Excluding __v and password fields
    // .skip(skipCount)
    // .limit(perPage);

    res.status(200).json({ Status: "Success", data: { users } });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// register new user
router.post("/register", async (req, res) => {
  try {
    // importing user model
    const { firstName, lastName, userName, email, password, role } = req.body;
    if (password.length < 6) {
      throw new Error("Password should be At least 6 characters");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date(); //This let the server create the timestamp

    if (firstName == null) {
      return res.status(401).json("First name is required");
    }
    if (lastName == null) {
      return res.status(401).json("Last name is required");
    }
    if (userName == null) {
      return res.status(401).json("UserName is required");
    }
    if (email == null) {
      return res.status(401).json("Email is required");
    }
    if (password == null) {
      return res.status(401).json("Password is required");
    }

    // Check if any required attribute is missing or empty
    if (!firstName || !lastName || !userName || !email || !password) {
      throw new Error("All attributes must be provided.");
    }

    const user = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      createdAt,
      role,
    });
    // Saving the user in the database
    const newUser = await user.save();

    /* We generate the token after the user is saved the DB 
        to make sure that token is generated only for the saved users */

    const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });

    // Save the token in the user document in the database
    user.token = token;
    await user.save();

    res.status(201).json({
      status: "User Registered successfully",
      user: newUser,
    });
  } catch (error) {
    // Log and handle registration errors
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (email == null) {
      return res.status(401).json("Email is required");
    }
    if (password == null) {
      return res.status(401).json("Password is required");
    }

    // Check if the Email or password are wrong
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json("Wrong Email or Password");
    }
    //generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });

    // Save  the token in the user document in the database
    user.token = token;
    await user.save();

    res.status(200).json({ Status: "Successful Login", data: user });
  } catch (error) {
    console.log("Login failed", error);
    res.status(500).json({ error: "login failed", message: error.message });
  }
});

// Delete your profile
router.delete("/:userId", verifyToken, async (req, res) => {
  const requestUserId = req.params.userId;
  const tokenUserId = req.user.userId;

  try {
    // Check if the user making the request matches the user ID in the token
    if (requestUserId !== tokenUserId) {
      return res.status(403).json({
        error: "Unauthorized: You are not allowed to delete this user",
      });
    }

    const deletedUser = await User.findByIdAndDelete(requestUserId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // not showing a message here cause I am using 204 status code which indicated that No content to show
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit your profile
router.patch("/profile/:userId", verifyToken, async (req, res) => {
  const requestUserId = req.params.userId;
  const tokenUserId = req.user.userId;

  try {
    const { firstName, lastName, userName, email, password } = req.body;

    // Check if the user exists
    const user = await User.findById(requestUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Only allow the owner to edit their own profile
    if (requestUserId !== tokenUserId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You are not allowed to edit this user" });
    }

    // Update only the specified fields using object destructuring
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json("Password should be At least 6 characters");
      }
      // Hash the new password
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();
    res.json({ message: "Profile updated successfully", data: { user } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Find By Id
router.get("/:userId", async (req, res) => {
  const requestUserId = req.params.userId;

  try {
    const user = await User.findById(requestUserId);

    if (!requestUserId) {
      return res.status(404).json("Not Found");
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
