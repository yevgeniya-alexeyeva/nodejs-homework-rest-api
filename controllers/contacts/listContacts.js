const { Contact } = require("../../model");

const listContacts = async (req, res, next) => {
  const { limit = 5, page = 1, favorite } = req.query;
  const { id: userId } = req.user;

  try {
    const {
      totalDocs: totalContacts,
      docs: contacts,
      ...params
    } = await Contact.paginate(
      { user: userId, ...(favorite ? { favorite } : {}) },
      {
        limit,
        page,
      }
    );

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          contacts,
          totalContacts,
          ...params,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
