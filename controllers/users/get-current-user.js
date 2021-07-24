const { User } = require("../../model");

const getCurrentUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    const { email, subscription } = await User.findById(id);

    res.json({
      id,
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrentUser;
