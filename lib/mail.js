require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(toEmail) {
  if (!toEmail) {
    throw new Error("Recipient email is required");
  }

  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const htmlPath = path.join(__dirname, "mail.html");
  let htmlContent = fs.readFileSync(htmlPath, "utf-8");
  htmlContent = htmlContent.replace("{{OTP}}", otp);

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your OTP Verification Code",
    html: htmlContent,
  });

  console.log("✅ OTP sent successfully");
  console.log("🔐 OTP:", otp);

  return otp;
}

/* ---------- Run directly (testing) ---------- */
if (require.main === module) {
  sendOTPEmail("salmanrasheedm0@gmail.com")
    .then((otp) => {
      console.log("✅ OTP email sent successfully");
      console.log("🔐 OTP:", otp);
    })
    .catch((err) => console.error("❌ Error:", err.message));
}

module.exports = { sendOTPEmail };

// require("dotenv").config({
//   path: require("path").resolve(__dirname, "../.env"),
// });
// const otpGenerator = require("otp-generator");
// const nodemailer = require("nodemailer");
// const { readFileSync } = require("fs");
// const path = require("path");

// // function generateOTP() {
// //   return Math.floor(100000 + Math.random() * 900000);
// // }

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// async function sendOTPEmail(toEmail) {
//   try {
//     const otp = otpGenerator.generate(4, {
//       upperCaseAlphabets: false,
//       specialChars: true,
//     });

//     const htmlPath = path.join(__dirname, "mail.html");
//     let htmlContent = readFileSync(htmlPath, "utf-8");

//     htmlContent = htmlContent.replace("{{OTP}}", otp);

//     const result = await transport.sendMail({
//       from: process.env.EMAIL_USER,
//       to: toEmail,
//       subject: "Your OTP Code",
//       html: htmlContent,
//     });

//     console.log("✅ OTP Email sent successfully");
//     console.log("🔐 OTP:", otp);
//   } catch (error) {
//     console.error("❌ Error sending OTP email:", error);
//   }
// }

// // Run directly
// sendOTPEmail();

// module.exports = { sendOTPEmail };

// let mailOptions = {
//   from: "ruk6852@gmail.com",
//   to: "salmanrasheedm0@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transport.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

// transport.sendMail({
//   from: "ruk6852@gmail.com",
//   to: "salmanrasheedm0@gmail.com",
//   subject: "Test Email from Nodemailer",
//   html: "<h1 style='color: blue;'>This is a test email sent using Node.js and Nodemailer.</h1><p>Hello! This email was sent using <b>Nodemailer</b> library in Node.js.</p>",
// });

// (async () => {
//   const result = await transport.sendMail({
//     from: "ruk6852@gmail.com",
//     to: "salmanrasheedm0@gmail.com",
//     subject: "Test Email from Nodemailer",
//     html: "<h1 style='color: blue;'>This is a test email sent using Node.js and Nodemailer.</h1><p>Hello! This email was sent using <b>Nodemailer</b> library in Node.js.</p>",
//   });
//   console.log("Email sent successfully:", result.messageId);
// })();

// (async () => {
//   try {
//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "ruk6852@gmail.com",
//         pass: "pmmu arni xbta qojy",
//       },
//     });
//     const result = await transport.sendMail({
//       from: "ruk6852@gmail.com",
//       to: "sallu2004mkt@gmail.com",
//       subject: "Test Email from Nodemailer",
//       html: "<h1 style='color: blue;'>This is a test email sent using Node.js and Nodemailer.</h1><p>Hello! This email was sent using <b>Nodemailer</b> library in Node.js.</p>",
//     });
//     console.log("Email sent successfully:");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// })();
