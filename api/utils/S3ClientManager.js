const { PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

class S3ClientManager {
  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.S3_REGION;
    this.Bucket = process.env.S3_BUCKET;

    this.client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      region
    })
  }

  // * Create a static method to get the S3 client instance
  static getInstance() {
    if (!S3ClientManager.instance) {
      S3ClientManager.instance = new S3ClientManager();
    }
    return S3ClientManager.instance;
  }

  // * Writes file in the bucket and returns the file name
  async writeFile(file) {
    const fileName = `${Date.now()}-${file.originalname}`

    // * Define the S3 upload parameters
    const params = {
      Bucket: this.Bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const putCommand = new PutObjectCommand(params);

    await this.client.send(putCommand);

    return fileName
  }

  // * Gets a file and returns it
  async getFile(fileName) {
    const getCommand = new GetObjectCommand({
      Bucket: this.Bucket,
      Key: fileName
    });

    const file = await this.client.send(getCommand)

    return file
  }

  async deleteFile(fileName) {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.Bucket,
      Key: fileName
    })

    await this.client.send(deleteCommand)
  }

  async generateTempPublicURL(fileName) {
    const getCommand = new GetObjectCommand({
      Bucket: this.Bucket,
      Key: fileName
    });

    // * profile avatar temp URL expires in 7 days (Same than the auth token)
    const tempURL = await getSignedUrl(this.client, getCommand, { expiresIn: 7 * 24 * 60 * 60 });

    return tempURL
  }
}

module.exports = S3ClientManager;