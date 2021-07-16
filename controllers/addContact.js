// const { addContactSchema } = require("../utils/validate/schemas/contacts");
const Contact = require("../model/contactModel");

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    if (!result) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
