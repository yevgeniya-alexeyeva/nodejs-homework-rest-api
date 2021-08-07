const { User } = require("../../model");
const { v4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");

const addUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }

    const verificationToken = v4();

    const newUser = await User.create({ ...req.body, verificationToken });

    if (!newUser) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    }

    const mail = {
      to: email,
      subject: "Please Verify Your Phonebook",
      text: "Let's verify your email so you can start to use your phonebook",
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Let's verify your email so you can start to use your phonebook</a>`,
    };

    sendEmail(mail);

    newUser.setPassword(password);
    const avatar = newUser.setAvatar(email);
    const { _id, subscription } = await newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        _id,
        email,
        subscription,
        avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
