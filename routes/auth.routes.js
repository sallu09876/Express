const express = require("express");
const {
  otpPage,
  sendOtp,
  verifyOtp,
  resendOtp,
} = require("../controllers/mail.controller");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);

/* UI */
router.get("/otp", otpPage);

/* API + UI */
router.post("/otp/send", sendOtp);
router.post("/otp/verify", verifyOtp);
router.post("/otp/resend", resendOtp);

module.exports = router;
