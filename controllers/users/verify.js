const { User } = require("../../model");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });

    if (!user)
      res.status(404).json({
        status: "not found",
        code: 404,
        message: "User not found",
      });

    await User.findByIdAndUpdate(user, {
      verificationToken: null,
      verify: true,
    });

    res.json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
