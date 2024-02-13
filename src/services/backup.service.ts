import * as minio from "minio";
import env from "../constants/env_variables.js";
import dayjs from "dayjs";
import {
  exec,
  ExecException,
} from "child_process";

class Backup_service {
  private minio_client: minio.Client;

  constructor(minio_client: minio.Client) {
    this.minio_client = minio_client;
  }

  private async generate_database_dump() {
    const filename = `${process.env.DATABASE_NAME}_${dayjs().format("DD-MM-YYYY_HH-mm-ss")}.dump`;
    await new Promise((resolve, reject) => {
      exec(
        `PGPASSWORD="${process.env.DATABASE_PASSWORD}" pg_dump -h ${process.env.DATABASE_URL} -Fc -U ${process.env.DATABASE_USERNAME} ${env.DATABASE_NAME} > ${filename}`,
        (error, stdout, stderror) => {
          if (error) {
            console.log(stderror);
            reject(error);
          }
          else {
            resolve(stdout);
          }
        });
    });
    return filename;
  }

  private async upload_chatwoot_backup(filename: string) {
    await this.minio_client.fPutObject(
      process.env.MINIO_BUCKET_NAME,
      filename,
      filename
    );
  }

  async chatwoot_database() {
    const filename = await this.generate_database_dump()
      .catch((err: ExecException) => {
        throw new Error("Error generating the database dump: " + err.message);
      });

    await this.upload_chatwoot_backup(filename)
      .catch((err) => {
        throw new Error("Error uploading database dump to Minio: " + err.message);
      });
  }
}

export default Backup_service;
