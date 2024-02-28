import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import {
  Stats
} from "fs";
import dayjs from "dayjs";

interface BackupInformation extends Stats {
  filename: string;
}

class Email_notification_helper {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      authMethod: "login",
      secure: false,
      requireTLS: true,
    });
  }

  async send_backup_notification(backupInformation: BackupInformation) {
    try {
      const emailBody = await ejs.renderFile(
        process.cwd() + "/templates/backup_notification_email.ejs",
        {
          identification: process.env.INSTANCE_ID,
          database: process.env.DATABASE_NAME,
          size: `${backupInformation.size / 1024 * 1024}MB`,
          time: dayjs(backupInformation.birthtime).format("HH-mm-ss DD-MM-YYYY")
        });

      await this.transporter.sendMail({
        to: "luis.raposo.dev@gmail.com",
        from: process.env.EMAIL_USERNAME,
        subject: "Chatwoot Backup Automation Finished",
        html: emailBody
      });
    }
    catch (err) {
      console.log("Error sending notification email: " + err);
    }
  }
}

export default new Email_notification_helper();
