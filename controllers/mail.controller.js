const { sendOTPEmail } = require("../lib/mail");

// Show OTP page
const otpPage = (req, res) => {
  res.render("otp", {
    message: null,
    error: null,
    email: null,
    resendAfter: null,
  });
};

// Send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.render("otp", {
        message: null,
        error: "Email is required",
        email: null,
        resendAfter: null,
      });
    }

    /* ⏱ RESEND BLOCK (60 seconds) */
    if (req.session.resend && Date.now() < req.session.resend) {
      const secondsLeft = Math.ceil((req.session.resend - Date.now()) / 1000);

      return res.render("otp", {
        message: null,
        error: `Please wait ${secondsLeft}s before resending OTP ⏳`,
        email,
        resendAfter: secondsLeft,
      });
    }

    /* 📩 SEND OTP */
    const otp = await sendOTPEmail(email); // ONLY OTP returned

    /* 💾 SAVE IN SESSION */
    req.session.otp = otp;
    req.session.email = email;
    req.session.resend = Date.now() + 60 * 1000;

    console.log("✅ OTP sent successfully");
    console.log("🔐 OTP:", otp); // terminal only

    res.render("otp", {
      message: "OTP sent successfully ✅",
      error: null,
      email,
      resendAfter: 60,
    });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);

    res.render("otp", {
      message: null,
      error: "Failed to send OTP ❌",
      email: null,
      resendAfter: null,
    });
  }
};

// Verify OTP
const verifyOtp = (req, res) => {
  const { otp1, otp2, otp3, otp4 } = req.body;
  const enteredOtp = `${otp1}${otp2}${otp3}${otp4}`;

  if (!req.session.otp) {
    return res.render("otp", {
      message: null,
      error: "OTP expired or not sent ❌",
      email: null,
      resendAfter: null,
    });
  }

  if (enteredOtp === req.session.otp) {
    const email = req.session.email;

    /* 🔥 DESTROY SESSION AFTER SUCCESS */
    req.session.destroy((err) => {
      if (err) console.error("Session destroy error:", err);

      return res.render("otp", {
        message: `OTP verified successfully for ${email} ✅`,
        error: null,
        email: null,
        resendAfter: null,
      });
    });
  } else {
    return res.render("otp", {
      message: null,
      error: "Invalid OTP ❌",
      email: req.session.email,
      resendAfter: null,
    });
  }
};

module.exports = { otpPage, sendOtp, verifyOtp };
