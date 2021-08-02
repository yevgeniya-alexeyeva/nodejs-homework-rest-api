const Jimp = require("jimp");

const cropAvatar = async (file) => {
  const avatar = await Jimp.read(file);
  await avatar
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(file);
};

module.exports = cropAvatar;
