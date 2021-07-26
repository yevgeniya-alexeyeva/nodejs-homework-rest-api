const { Contact } = require("../../model");

const addToFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const { id } = req.user;

  if (!body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
  }

  try {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, user: id },
      body,
      {
        new: true,
      }
    );

    if (!result) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
      return;
    }

    res.json({
      status: "success",
      message: "added to favorite",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "not found",
      });
    }
    next(error);
  }
};

module.exports = addToFavorite;
