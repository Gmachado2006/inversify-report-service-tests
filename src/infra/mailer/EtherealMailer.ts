import { injectable } from 'inversify';
import * as nodemailer from 'nodemailer';
import { Mailer } from '../../domain/interfaces/Mailer';


@injectable()
export class EtherealMailer implements Mailer {
  private transporter: nodemailer.Transporter | null = null;

  async send(to: string, subject: string, body: string): Promise<void> {
    
    if (!this.transporter) {
      const testAccount = await nodemailer.createTestAccount();
      
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

   
    const info = await this.transporter.sendMail({
      from: '"Sistema de Relatórios" <sistema@exemplo.com>',
      to,
      subject,
      html: body
    });

   
    console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
  }
}