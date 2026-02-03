require("dotenv").config();

const nodemailer = require("nodemailer");
const { readFileSync } = require("fs");
const path = require("path");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail() {
  try {
    const otp = generateOTP();

    const htmlPath = path.join(__dirname, "mail.html");
    let htmlContent = readFileSync(htmlPath, "utf-8");

    htmlContent = htmlContent.replace("{{OTP}}", otp);

    const result = await transport.sendMail({
      from: "ruk6852@gmail.com",
      to: "sallu2004mkt@gmail.com",
      subject: "Your OTP Code",
      html: htmlContent,
    });

    console.log("✅ OTP Email sent successfully");
    console.log("🔐 OTP:", otp);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
}

// Run directly
sendOTPEmail();

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
