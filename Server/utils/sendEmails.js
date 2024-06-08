// utils/sendEmails.js
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use SSL
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_APP_PASS,
    },
    authMethod: "LOGIN", // Specify the authentication method
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.to,
    subject: options.subject,
    html: options.message,
  };
  console.log(mailOptions);
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle errors appropriately (e.g., retry, inform user)
  }
};

module.exports = sendEmail;
