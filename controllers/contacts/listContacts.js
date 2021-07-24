const { Contact } = require("../../model");

const listContacts = async (req, res, next) => {
  try {
    console.log("listContacts -> Contact", Contact);
    const result = await Contact.find({});
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

module.exports = listContacts;
