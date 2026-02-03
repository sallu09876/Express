const bcrypt = require("bcrypt");
const { sendOTPEmail } = require("../lib/mail");

const users = [];

// REGISTER
const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).send({ ok: false, message: "All fields required" });
  }

  const userExists = users.find(
    (u) => u.username === username || u.email === email,
  );

  if (userExists) {
    return res.status(409).send({ ok: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ name, username, email, password: hashedPassword });

  res.status(201).send({ ok: true, message: "Registered successfully" });
};

// LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send({ ok: false, message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ ok: false, message: "Invalid credentials" });
  }

  res.send({ ok: true, message: "Login successful", user });
};

module.exports = { register, login };
