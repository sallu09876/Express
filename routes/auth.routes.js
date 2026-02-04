const express = require("express");
// const router = express.Router();
import { Router } from 'express';
const router = Router();
const mailController = require("../controllers/mail.controller");

// OTP routes
router.get("/otp", mailController.otpPage);             // GET page
router.post("/otp", mailController.sendOtp);            // POST email to send OTP
router.post("/verify-otp", mailController.verifyOtp);  // POST OTP verification

// module.exports = router;
export default router;