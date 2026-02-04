const { sendOTPEmail } = require("../lib/mail");
const otpStore = require("../utils/otpStore");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
const RESEND_TIME = 60 * 1000; // 60 seconds

/* ===================== HELPERS ===================== */
const isAPI = (req) =>
  req.headers.accept?.includes("application/json") ||
  req.headers["content-type"] === "application/json";

/* ===================== UI PAGE ===================== */
const otpPage = (req, res) => {
  res.render("otp", {
    message: null,
    error: null,
    email: null,
    canResend: false,
    waitTime: 0,
  });
};

/* ===================== SEND OTP ===================== */
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !EMAIL_REGEX.test(email)) {
    return respond(req, res, false, "Invalid email address");
  }

  // Check if OTP already sent and resend time not elapsed
  const existing = otpStore.get(email);

  // If existing and still within resend time
  if (existing && Date.now() < existing.resendAt) {
    const wait = Math.ceil((existing.resendAt - Date.now()) / 1000);
    return respond(
      req,
      res,
      false,
      `Wait ${wait}s before resending`,
      email,
      wait,
    );
  }

  const otp = await sendOTPEmail(email);

  otpStore.set(email, {
    otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY,
    resendAt: Date.now() + RESEND_TIME,
  });

  console.log("🔐 OTP sent:", otp);

  respond(req, res, true, "OTP sent successfully", email, 60);
};

/* ===================== VERIFY OTP ===================== */
const verifyOtp = (req, res) => {
  let { email, otp, otp1, otp2, otp3, otp4 } = req.body;

  // Support both UI & API
  // Combine otp1, otp2, otp3, otp4 if otp not provided
  if (!otp && otp1) {
    otp = `${otp1}${otp2}${otp3}${otp4}`;
  }

  // Validate inputs
  if (!email || !otp) {
    return respond(req, res, false, "Email & OTP required");
  }

  // Validate email format
  const record = otpStore.get(email);

  // Check if record exists
  if (!record) {
    return respond(req, res, false, "OTP does not exist");
  }

  // Check if OTP expired
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return respond(req, res, false, "OTP expired");
  }

  // Check if OTP matches
  if (record.otp !== otp) {
    return respond(req, res, false, "Invalid OTP", email);
  }

  // OTP verified successfully
  otpStore.delete(email);

  // Destroy session if exists
  if (req.session) {
    req.session.destroy(() => {});
  }

  respond(req, res, true, "OTP verified successfully");
};

/* ===================== RESEND OTP ===================== */
const resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !EMAIL_REGEX.test(email)) {
    return respond(req, res, false, "Invalid email");
  }

  const record = otpStore.get(email);

  if (!record) {
    return respond(req, res, false, "OTP not found");
  }

  if (Date.now() < record.resendAt) {
    const wait = Math.ceil((record.resendAt - Date.now()) / 1000);
    return respond(
      req,
      res,
      false,
      `Wait ${wait}s before resending`,
      email,
      wait,
    );
  }

  const otp = await sendOTPEmail(email);

  otpStore.set(email, {
    otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY,
    resendAt: Date.now() + RESEND_TIME,
  });

  console.log("🔁 OTP resent:", otp);

  respond(req, res, true, "OTP resent successfully", email, 60);
};

/* ===================== RESPONSE HANDLER ===================== */
function respond(req, res, ok, message, email = null, waitTime = 0) {
  if (isAPI(req)) {
    return res.json({
      ok,
      message,
      email,
      waitTime,
      timestamp: Date.now(),
    });
  }

  return res.render("otp", {
    message: ok ? message : null,
    error: ok ? null : message,
    email,
    canResend: waitTime === 0,
    waitTime,
  });
}

module.exports = { otpPage, sendOtp, verifyOtp, resendOtp };
