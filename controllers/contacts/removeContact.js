const { Contact } = require("../../model");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { id } = req.user;

  try {
    const result = await Contact.findByIdAndDelete({
      _id: contactId,
      user: id,
    });

    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
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

module.exports = removeContact;
