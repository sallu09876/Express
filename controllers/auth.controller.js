const bcrypt = require("bcrypt");

// In-memory user array
const users = [];

/* ---------------- REGISTER ---------------- */
const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .send({ ok: false, message: "All fields are required" });
    }

    const userExists = users.find(
      (u) => u.username === username || u.email === email,
    );

    if (userExists) {
      return res
        .status(409)
        .send({ ok: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    users.push({ name, username, email, password: hashedPassword });

    // Send OTP after registration (optional)
    // const otp = await sendOTPEmail(email);
    // req.session.otp = otp;
    // req.session.email = email;

    res.status(201).send({ ok: true, message: "Registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).send({ ok: false, message: "Internal server error" });
  }
};

/* ---------------- LOGIN ---------------- */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ ok: false, message: "All fields required" });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res
        .status(401)
        .send({ ok: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ ok: false, message: "Invalid credentials" });
    }

    // Optionally, generate session or JWT here
    req.session.user = { username: user.username, email: user.email };

    res.send({
      ok: true,
      message: "Login successful",
      user: { name: user.name, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ ok: false, message: "Internal server error" });
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
