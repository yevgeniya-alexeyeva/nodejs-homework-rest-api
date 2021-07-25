const { User } = require("../../model");
const addToken = require("../../helpers/addToken");

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

    const newUser = await User.create(req.body);

    if (!newUser) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    }
    newUser.setPassword(password);
    const { _id, subscription } = await newUser.save();

    const token = addToken(_id);

    const loginUser = await User.findOneAndUpdate({ _id }, { token });
    console.log("addUser -> loginUser", loginUser);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        _id,
        email,
        subscription,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
