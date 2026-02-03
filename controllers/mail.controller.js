const { sendOTPEmail } = require("../lib/mail");

// Show OTP page
const otpPage = (req, res) => {
  res.render("otp", { message: null, error: null, email: null });
};

// Send OTP to user email
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.render("otp", {
        message: null,
        error: "Email is required",
        email: null,
      });
    }

    // Send OTP
    const otp = await sendOTPEmail(email);

    // Save OTP & email in session
    req.session.otp = otp;
    req.session.email = email;

    res.render("otp", {
      message: "OTP sent successfully ✅",
      error: null,
      email,
    });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.render("otp", {
      message: null,
      error: "Failed to send OTP ❌",
      email: null,
    });
  }
};

// Verify OTP entered by user
const verifyOtp = (req, res) => {
  const { otp1, otp2, otp3, otp4 } = req.body;
  const enteredOtp = `${otp1}${otp2}${otp3}${otp4}`;

  if (!req.session.otp) {
    return res.render("otp", {
      message: null,
      error: "No OTP sent. Please try again ❌",
      email: null,
    });
  }

  if (enteredOtp === req.session.otp) {
    // OTP verified ✅
    const email = req.session.email;

    // Clear OTP from session
    req.session.otp = null;
    req.session.email = null;

    return res.render("otp", {
      message: `OTP verified successfully for ${email} ✅`,
      error: null,
      email: null,
    });
  } else {
    return res.render("otp", {
      message: null,
      error: "Invalid OTP ❌",
      email: req.session.email,
    });
  }
};

module.exports = { otpPage, sendOtp, verifyOtp };
