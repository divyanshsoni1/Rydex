import Nodemailer from "nodemailer";

const transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"RYDEX" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};
