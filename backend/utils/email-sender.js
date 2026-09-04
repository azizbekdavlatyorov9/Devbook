const nodemailer = require("nodemailer");
const CustomErrorHandler = require("../error/error");

async function sendEmail(email, code) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "azizbekdavlatyorov9@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      subject: "DevBook",
      text: "lorem ipsum",
      from: "azizbekdavlatyorov9@gmail.com",
      to: email,
      html: `<h1 style="color:blue; font-size:36px;">${code}</h1>`,
    });
  } catch (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }
}

module.exports = sendEmail;
