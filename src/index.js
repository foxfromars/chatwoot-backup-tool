const minio = require("minio");
const nodemailer = require("nodemailer");
const {
  validateOrReject,
  IsString,
  IsUrl,
  validateSync,
} = require("class-validator");
require("dotenv").config();

class Variables {
  @IsString() MINIO_URL;
  @IsString() MINIO_BUCKET_NAME;
  @IsString() MINIO_ACESS_KEY;
  @IsString() MINIO_SECRET_KEY;
  @IsString() MINIO_PORT;

  @IsString() DATABASE_URL;
  @IsString() DATABASE_NAME;
  @IsString() DATABASE_USERNAME;
  @IsString() DATABASE_PASSWORD;
  @IsString() DATABASE_PORT;

  @IsString() EMAIL_HOST;
  @IsString() EMAIL_USERNAME;
  @IsString() EMAIL_PASSWORD;
  @IsString() EMAIL_PORT;

  constructor() {
    this.MINIO_URL = process.env.MINIO_URL;
    this.MINIO_BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
    this.MINIO_ACESS_KEY = process.env.MINIO_ACESS_KEY;
    this.MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;
    this.MINIO_PORT = process.env.MINIO_SECRET_KEY;

    this.DATABASE_URL = process.env.DATABASE_URL;
    this.DATABASE_NAME = process.env.DATABASE_NAME;
    this.DATABASE_USERNAME = process.env.DATABASE_USERNAME;
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
    this.DATABASE_PORT = process.env.DATABASE_PORT;

    this.EMAIL_HOST = process.env.EMAIL_HOST;
    this.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
    this.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
    this.EMAIL_PORT = process.env.EMAIL_PORT;

    const errors = validateSync(this);
    if (errors.length > 0) {
      throw errors;
    }
  }
}

async function main() {
  const env = new Variables();

  const minioClient = new minio.Client({
    endPoint: env.MINIO_URL,
    port: env.MINIO_PORT,
    useSSL: true,
    accessKey: env.MINIO_ACESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
  });

  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: true,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  });


}

main();
