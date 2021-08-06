const sendEmail = require("../../helpers/sendEmail");
const { User } = require("../../model");

const sendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const { verificationToken } = await User.findOne({ email });

    if (!verificationToken) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Verification token not found",
      });
    }

    const mail = {
      to: email,
      subject: "Please Verify Your Phonebook",
      text: "Let's verify your email so you can start to use your phonebook",
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Let's verify your email so you can start to use your phonebook</a>`,
    };

    sendEmail(mail);
    res.json({
      status: "success",
      code: 200,
      message: "Email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendVerifyEmail;
