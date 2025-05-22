import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import xss from "xss";

dotenv.config();

import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/authMiddleware.js";

export const signup = async (req, res) => {
  // 1. Get and sanitize inputs
  const email = xss(req.body.email?.trim().toLowerCase());
  const username = xss(req.body.username?.trim());
  const password = req.body.password;
  const dateOfBirth = req.body.dateOfBirth;

  console.log("Processed signup data:", { email, username, dateOfBirth });

  try {
    if (!email || !password || !username || !dateOfBirth) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(409).json({ message: "User already exist" });
    }
    if (!dateOfBirth.month || !dateOfBirth.day || !dateOfBirth.year) {
      return res.status(400).json({ message: "Date of birth is incomplete" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already taken" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = {
      email,
      password: hashedPassword,
      username,
      dateOfBirth: {
        month: parseInt(dateOfBirth.month),
        day: parseInt(dateOfBirth.day),
        year: parseInt(dateOfBirth.year),
      },
    };
    console.log("Attempting to create user with data:", {
      ...userData,
      password: "[REDACTED]",
    });

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
      dateOfBirth: {
        month: parseInt(dateOfBirth.month),
        day: parseInt(dateOfBirth.day),
        year: parseInt(dateOfBirth.year),
      },
    });

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User is created",
      user: {
        email: result.email,
        username: result.username,
        dateOfBirth: result.dateOfBirth,
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const login = async (req, res) => {
  const username = xss(req.body.username?.trim());
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Match refresh function

      // sameSite: "Strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/api/auth/refresh",
      sameSite: "Strict",
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error during logout",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const newRefreshToken = generateRefreshToken(user);
    const newAccessToken = generateAccessToken(user);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/api/auth/refresh",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Yes, setting the path for the cookie is a good practice, especially to control where the cookie is sent. By default, cookies are only sent to the same path where they were set.

    res.json({
      message: "Tokens refreshed successfully",
      accessToken: newAccessToken,
    });
  });
};
