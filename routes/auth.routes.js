const express = require("express");
const controller = require("../controllers/mail.controller");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get("/otp", controller.otpPage);
router.post("/otp", controller.sendOtp);

module.exports = router;
