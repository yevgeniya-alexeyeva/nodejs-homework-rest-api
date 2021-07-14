const contacts = require("../model/contacts.json");

const { addContactSchema } = require("../utils/validate/schemas/contacts");
const Contact = require("../model/contactModel");

const addContact = async (req, res) => {
  const { body } = addContactSchema.validate(req);
  const { error } = body;
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
  }
  try {
    const result = await Contact.create(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: result,
      },
    });
  } catch (error) {}
};

module.exports = addContact;
