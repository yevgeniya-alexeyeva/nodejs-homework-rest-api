const contacts = require("../contacts.json");
const { v4: getId } = require("uuid");

const addContact = (req, res) => {
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
