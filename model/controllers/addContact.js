const contacts = require("../contacts.json");
const { v4: getId } = require("uuid");
const { addContactSchema } = require("../../utils/validate/schemas/contacts");

const addContact = (req, res) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
  }

  const newContact = {
    ...req.body,
    id: getId(),
  };

  contacts.push(newContact);

  res.json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

module.exports = addContact;
