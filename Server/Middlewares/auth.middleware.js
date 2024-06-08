const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  let token;

  // Check for token in Authorization header
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  // Check for token in cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json("Access denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
