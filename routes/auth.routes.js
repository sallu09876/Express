const express = require("express");
const router = express.Router();
// import { Router } from 'express';
// const router = Router();
const mailController = require("../controllers/mail.controller");
const authController = require("../controllers/auth.controller");

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// OTP routes
router.get("/otp", mailController.otpPage); // GET page
router.post("/otp", mailController.sendOtp); // POST email to send OTP
router.post("/verify-otp", mailController.verifyOtp); // POST OTP verification

module.exports = router;
// export default router;