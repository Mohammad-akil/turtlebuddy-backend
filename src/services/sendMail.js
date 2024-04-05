import nodemailer from "nodemailer";
import config from "../config/config.js";

const sendMails = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: config.nodemailer.host,
    auth: {
      user: config.nodemailer.auth.user,
      pass: config.nodemailer.auth.pass,
    },
  });

  const mailOptions = {
    from: config.email.fromEmail,
    to: to,
    subject: subject, // "Reset Your Password",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

export default sendMails;
