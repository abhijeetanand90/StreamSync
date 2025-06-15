/**
 * @jest-environment node
 */

import { test, expect, describe } from "@jest/globals";
jest.mock("../../models/User.js");
import { login } from "../authController";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { signup } from "../authController";
import validator from "validator";
import { generateAccessToken, generateRefreshToken } from "../../middleware/authMiddleware";
jest.mock("../../middleware/authMiddleware");
jest.mock("bcrypt");
jest.mock("validator");

describe("signup function", () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });
  test('Missing Fields-> 400 "All fields are required"', async () => {
    req.body = { username: "", password: "", email: "", dateOfBirth: "" };
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  test('Email already exists->409 "User already exist"', async () => {
    req.body = {
      username: "something",
      password: "somepassword",
      email: "exist@gmail.com",
      dateOfBirth: { month: "09", day: "06", year: "2025" },
    };

    User.findOne.mockResolvedValue({ email: "exist@gmail.com" });
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "User already exist",
    });
  });
  test('Incomplete date of birth->400 "Date of birth is incomplete"', async () => {
    req.body = {
      username: "something",
      password: "somepassword",
      email: "exist@gmail.com",
      dateOfBirth: { month: "09", day: "", year: "2025" },
    };
    User.findOne.mockResolvedValue(null);
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Date of birth is incomplete",
    });
  });

  test('Exising Username->409 "Username already taken"', async () => {
    req.body = {
      username: "something",
      password: "somepassword",
      email: "exist@gmail.com",
      dateOfBirth: { month: "09", day: "08", year: "2025" },
    };
    User.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ username: "something" });
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Username already taken",
    });
  });

  test('Invalid email format ->400 "Invalid email format"', async () => {
    req.body = {
      username: "something",
      password: "somepassword",
      email: "test@",
      dateOfBirth: { month: "09", day: "08", year: "2025" },
    };
    User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

    validator.isEmail.mockReturnValue(false);

    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email format",
    });
  });

  test('successful signup->201"User is created"', async () => {
    req.body = {
      username: "something",
      password: "somepassword",
      email: "validemail@gmail",
      dateOfBirth: { month: "09", day: "08", year: "2025" },
    };
    User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    validator.isEmail.mockReturnValue(true);
    bcrypt.hash.mockResolvedValue("qwerty678901");
    User.create.mockResolvedValue({
      email: "validemail@gmail",
      password: "qwerty678901",
      username: "something",
      dateOfBirth: {
        month:'09',
        day:'08',
        year:'2025'
      },
    });

    generateAccessToken.mockReturnValue("asdfhk49903nc")
    generateRefreshToken.mockReturnValue("asdfhk49903nc")
 
    await signup(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User is created",
      user: {
        email: "validemail@gmail",
        username: "something",
        dateOfBirth: {
           month:'09',
        day:'08',
        year:'2025'
        },
      },
      accessToken: "asdfhk49903nc",
      refreshToken:"asdfhk49903nc"

    });
  });
});






describe("Login Function", () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });

  test("Valid username + valid password → 200 with accessToken", async () => {
    req.body = { username: "testuser", password: "validpassword" };
    const mockUser = {
      _id: "user123",
      username: "testuser",
      password: "hashedpassword",
    };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: expect.any(String),
      })
    );
  });
  test('Missing username → 400 "All fields are required"', async () => {
    req.body = { password: "somepassword" };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  test('Invalid Username->401 "Invalid Credentials"', async () => {
    req.body = { username: "nonexistent", password: "1234abc" };
    User.findOne.mockResolvedValue(null);
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Credentials",
    });
  });

  test('Inavalid Password->401 "Invalid Credentials"', async () => {
    req.body = { username: "existing", password: "qwertyui" };
    User.findOne.mockResolvedValue({
      _id: "user123",
      username: "something",
      password: "wrongPassword",
    });
    bcrypt.compare.mockResolvedValue(false);
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Credentials",
    });
  });

  test('Missing Password->400 "All fields required"', async () => {
    req.body = { username: "something", password: "" };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  test('Database error->500 "Something went wrong"', async () => {
    req.body = { username: "something", password: "password" };

    User.findOne.mockRejectedValue(new Error("Database connection failed"));
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong",
      error: "Database connection failed",
    });
  });
});
