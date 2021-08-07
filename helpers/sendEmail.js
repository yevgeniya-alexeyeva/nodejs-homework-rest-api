const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: "y.alekseyeva@gmail.com",
    subject,
    text,
    html,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = sendEmail;
