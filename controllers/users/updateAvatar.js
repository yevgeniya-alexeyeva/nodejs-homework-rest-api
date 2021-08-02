const path = require("path");
const fs = require("fs/promises");
const cropAvatar = require("../../helpers/cropAvatar");

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;

  const { path: tempName, originalname } = req.file;

  const uploadDir = path.join(process.cwd(), "public", "avatars");

  try {
    await cropAvatar(tempName);

    const fileName = path.join(uploadDir, `${id}-${originalname}`);

    fs.rename(tempName, fileName);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          id,
          avatarUrl: fileName,
        },
      },
    });
  } catch (error) {
    fs.unlink(tempName);
    next(error);
  }
};

module.exports = updateAvatar;
