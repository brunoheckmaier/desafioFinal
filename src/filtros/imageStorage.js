const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);
const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const uploadFile = async (path, mimetype, buffer) => {
  const arquivo = await s3
    .upload({
      Bucket: process.env.BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise()
    .catch(console.error);

  return {
    url: arquivo.Location,
    path: arquivo.Key,
  };
};

const excluirArquivo = async (path) => {
  await s3
    .deleteObject({
      Bucket: process.env.BUCKET,
      Key: path,
    })
    .promise();
};

const listarImagens = async (req, res) => {
  try {
    const files = await s3
      .listObjects({
        Bucket: process.env.KEY_NAME,
      })
      .promise();

    const imagens = files.Contents.map((imagem) => {
      return {
        url: `http://${process.env.BUCKET}.${process.env.ENDPOINT_S3}/${imagem.Key}`,
        Diretorio: `${imagem.Key}`,
      };
    });

    return res.status(200).json(imagens);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  uploadFile,
  excluirArquivo,
  listarImagens,
};
