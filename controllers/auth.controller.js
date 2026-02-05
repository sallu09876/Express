const bcrypt = require("bcrypt");
const User = require("../models/AuthUser");

/* ---------------- REGEX ---------------- */
const nameRegex = /^[A-Za-z ]{3,50}$/;
const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

/* ---------------- REGISTER ---------------- */
const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    /* ---- Empty Check ---- */
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: "All fields are required",
      });
    }

    /* ---- Name Validation ---- */
    if (!nameRegex.test(name)) {
      return res.status(400).json({
        ok: false,
        message: "Name must contain only letters and spaces (3–50 characters)",
      });
    }

    /* ---- Username Validation ---- */
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        ok: false,
        message:
          "Username must be 4–20 characters (letters, numbers, underscore only)",
      });
    }

    /* ---- Email Validation ---- */
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid email format",
      });
    }

    /* ---- Password Validation ---- */
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        ok: false,
        message:
          "Password must be at least 6 characters and include uppercase, lowercase and a number",
      });
    }

    /* ---- Existing User Check ---- */
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: "Username or email already exists",
      });
    }

    /* ---- Hash Password ---- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---- Save User ---- */
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      ok: true,
      message: "Registered successfully",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

/* ---------------- LOGIN ---------------- */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    /* ---- Empty Check ---- */
    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message: "All fields are required",
      });
    }

    /* ---- Username Validation ---- */
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid username format",
      });
    }

    /* ---- Find User ---- */
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Invalid credentials",
      });
    }

    /* ---- Password Match ---- */
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Invalid credentials",
      });
    }

    /* ---- Save Session ---- */
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.json({
      ok: true,
      message: "Login successful",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

module.exports = { register, login };

// Register demo :-
// {
//   "name": "Salman",
//   "username": "salman123",
//   "email": "salman@gmail.com",
//   "password": "123456"
// }

// Login demo :-
// {
//   "username": "salman123",
//   "password": "123456"
// }
