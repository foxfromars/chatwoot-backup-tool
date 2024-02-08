import {
  IsString,
  IsNotEmpty,
  validateSync,
  IsInt,
} from "class-validator";

import dotenv from "dotenv";
dotenv.config({path: `${process.cwd()}/.env`});

class Variables {
  @IsString() @IsNotEmpty() MINIO_URL: string;
  @IsString() @IsNotEmpty() MINIO_BUCKET_NAME: string;
  @IsString() @IsNotEmpty() MINIO_ACESS_KEY: string;
  @IsString() @IsNotEmpty() MINIO_SECRET_KEY: string;
  @IsInt() MINIO_PORT: number;

  @IsString() @IsNotEmpty() DATABASE_URL: string;
  @IsString() @IsNotEmpty() DATABASE_NAME: string;
  @IsString() @IsNotEmpty() DATABASE_USERNAME: string;
  @IsString() @IsNotEmpty() DATABASE_PASSWORD: string;
  @IsInt() DATABASE_PORT: number;

  @IsString() @IsNotEmpty() EMAIL_HOST: string;
  @IsString() @IsNotEmpty() EMAIL_USERNAME: string;
  @IsString() @IsNotEmpty() EMAIL_PASSWORD: string;
  @IsInt() EMAIL_PORT: number;

  constructor() {
    this.MINIO_URL = process.env.MINIO_URL;
    this.MINIO_BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
    this.MINIO_ACESS_KEY = process.env.MINIO_ACESS_KEY;
    this.MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;
    this.MINIO_PORT = parseInt(process.env.MINIO_PORT);

    this.DATABASE_URL = process.env.DATABASE_URL;
    this.DATABASE_NAME = process.env.DATABASE_NAME;
    this.DATABASE_USERNAME = process.env.DATABASE_USERNAME;
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
    this.DATABASE_PORT = parseInt(process.env.DATABASE_PORT);

    this.EMAIL_HOST = process.env.EMAIL_HOST;
    this.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
    this.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
    this.EMAIL_PORT = parseInt(process.env.EMAIL_PORT);

    const errors = validateSync(this);
    if (errors.length > 0) {
      throw errors;
    }
  }
}

export default new Variables();
