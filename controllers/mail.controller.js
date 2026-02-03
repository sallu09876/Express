const { sendOTPEmail } = require("../lib/mail");

const otpPage = (req, res) => {
  res.render("otp", { message: null, error: null });
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = await sendOTPEmail(email);

    req.session.otp = otp;
    req.session.email = email;

    res.render("otp", {
      message: "OTP sent successfully to your email ✅",
      error: null,
    });
  } catch (err) {
    res.render("otp", {
      message: null,
      error: "Failed to send OTP. Try again ❌",
    });
  }
};

module.exports = { otpPage, sendOtp };
