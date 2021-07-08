const contacts = require("../contacts.json");

const getContactById = (req, res) => {
  const { contactId } = req.params;

  const selectContact = contacts.find(({ id }) => id + "" === contactId);

  if (!selectContact) {
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
      result: selectContact,
    },
  });
};

module.exports = getContactById;
