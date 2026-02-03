const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session (IMPORTANT for OTP)
app.use(
  session({
    secret: "otp-secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/auth/otp`);
});
