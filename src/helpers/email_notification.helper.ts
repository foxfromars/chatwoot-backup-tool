import nodemailer, { Transporter } from "nodemailer";
import env from "../constants/env_variables.js";

class Email_notification_helper {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: true,
      auth: {
        user: env.EMAIL_USERNAME,
        pass: env.EMAIL_PASSWORD,
      },
    });
  }

  async send_backup_notification() {
    try {
      this.transporter.sendMail({
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}
