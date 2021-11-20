import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  secure: true,
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
});

export const sendMail = async (
  userAddr: string,
  subject: string,
  letter: string
) => {
  const mailOptions = {
    from: config.smtpAddr,
    to: userAddr,
    subject: subject,
    html: letter,
  };

  return await transporter.sendMail(mailOptions);
};