const { Contact } = require("../../model");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { id } = req.user;

  try {
    const result = await Contact.findOne({ _id: contactId, user: id });

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
