const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username is not available"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "Must be a valid Email"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return password.length >= 6;
      },
      message: "Password should be at least 6 characters long",
    },
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
