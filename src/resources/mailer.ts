import nodemailer from "nodemailer";
import { HttpException } from "../exceptions";
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
    from: `Modoolist <${config.smtpAddr}>`,
    to: userAddr,
    subject: subject,
    html: letter,
  };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (e) {
    throw new HttpException(520, e);
  }
};
