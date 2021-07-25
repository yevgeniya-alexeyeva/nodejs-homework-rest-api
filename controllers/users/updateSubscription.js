const { User } = require("../../model");

const updateSubscription = async (req, res, next) => {
  const { id } = req.params;
  const { subscription } = req.body;

  if (["starter", "pro", "business"].indexOf(subscription) === -1) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
    return;
  }
  try {
    const user = await User.findByIdAndUpdate(id, subscription);

    if (!user) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
