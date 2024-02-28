import * as minio from "minio";
import Backup_service from "./services/backup.service.js";
import dayjs from "dayjs";
import fs from "fs";
import fs_promise from "fs/promises";
import path from "path";
import email_notificationHelper from "./helpers/email_notification.helper.js";

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
      endPoint: process.env.MINIO_URL,
      accessKey: process.env.MINIO_ACESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });

    const backup_service = new Backup_service(minioClient);
    const backupInformation = await backup_service.chatwoot_database();
    console.log(
      dayjs().format("DD-MM-YYYY-HH-mm-ss"),
      "Backup Concluido"
    );
    await email_notificationHelper.send_backup_notification(backupInformation);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    await exit();
  }
}

main();
