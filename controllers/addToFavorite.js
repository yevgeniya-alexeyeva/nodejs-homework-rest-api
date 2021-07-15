const Contact = require("../model/contactModel");

const addToFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  if (!body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

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
    next(error);
  }
};

module.exports = addToFavorite;
