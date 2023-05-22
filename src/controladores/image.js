const { uploadFile } = require("../filtros/imageStorage");

const uploadImage = async (req, res) => {
  const { originalname, mimetype, buffer } = req.file;
  try {
    const imagem = await uploadFile(originalname, mimetype, buffer);

    return res.status(200).json(imagem);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  uploadImage,
};
