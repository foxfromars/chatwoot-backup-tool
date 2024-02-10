import * as minio from "minio";
import Backup_service from "./services/backup.service.js";
import env from "./constants/env_variables.js";
import dayjs from "dayjs";
import fs from "fs";
import fs_promise from "fs/promises";
import path from "path";

async function exit() {
  fs.readdir("./", (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    const pngFiles = files.filter(file => file.endsWith('.dump'));

    pngFiles.forEach(file => {
      const filePath = path.join("./", file);
      fs_promise.rm(filePath);

    });
  });

  console.log("exit with success");
}

async function main() {
  try {
    const minioClient = new minio.Client({
      endPoint: env.MINIO_URL,
      useSSL: true,
      accessKey: env.MINIO_ACESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
    });

    const backup_service = new Backup_service(minioClient);
    await backup_service.chatwoot_database();
    console.log(
      dayjs().format("DD-MM-YYYY-HH-mm-ss"),
      "Backup Concluido"
    );
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    await exit();
  }
}

main();
