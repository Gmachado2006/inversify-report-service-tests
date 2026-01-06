import { injectable } from 'inversify';
import * as nodemailer from 'nodemailer';
import { Mailer } from '../../domain/interfaces/Mailer';

@injectable()
export class GmailMailer implements Mailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"Sistema de Relatórios" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: body
    });
  }
}