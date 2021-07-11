const contacts = require("../contacts.json");
const {
  updateContactSchema,
} = require("../../utils/validate/schemas/contacts");

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
    console.log(req.body);
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
    return;
  }

  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
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
