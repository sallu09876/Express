const express = require("express");
const {
  otpPage,
  sendOtp,
  verifyOtp,
  resendOtp,
} = require("../controllers/mail.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

/* UI */
router.get("/otp", otpPage);

/* API + UI */
router.post("/otp/send", sendOtp);
router.post("/otp/verify", verifyOtp);
router.post("/otp/resend", resendOtp);

module.exports = router;
