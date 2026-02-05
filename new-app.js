const express = require("express");
const session = require("express-session");
const path = require("path");
const connectDB = require("./config/db");
const otpRoutes = require("./routes/auth.routes");

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", otpRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000/otp");
});
