const { User } = require("../../model");
const addToken = require("../../helpers/addToken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const { subscription, verify } = user;
    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Email or password is wrong",
      });
      return;
    }

    if (!verify) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Email not verified",
      });
      return;
    }

    const token = addToken(user._id);

    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          token,
          user: {
            email,
            subscription,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
