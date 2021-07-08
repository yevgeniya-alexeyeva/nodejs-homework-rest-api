const contacts = require("../contacts.json");

const updateContact = (req, res) => {
  const { contactId } = req.params;

  const index = contacts.findIndex(({ id }) => id + "" === contactId);

  if (index === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }

  if (!req.body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
    return;
  }

  contacts[index] = {
    ...contacts[index],
    ...req.body,
    contactId,
  };

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts[index],
    },
  });
};

module.exports = updateContact;
