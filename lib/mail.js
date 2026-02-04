require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(email) {
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const html = fs
    .readFileSync(path.join(__dirname, "mail.html"), "utf-8")
    .replace("{{OTP}}", otp);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html,
  });

  console.log("✅ OTP sent successfully");
  // console.log("🔐 OTP:", otp);

  return otp;
}

module.exports = { sendOTPEmail };
