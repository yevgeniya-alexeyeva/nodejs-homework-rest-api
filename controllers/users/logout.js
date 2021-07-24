const { User } = require("../../model");

const logout = async (req, res, next) => {
  const { id } = req.user;
  try {
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
