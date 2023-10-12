import nodemailer from 'nodemailer';

export class Mailer {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendConfirmation(email: string, token: string) {
    await this.transporter.sendMail({
      from: '"cgs" <nodejs@example.com>',
      to: email,
      subject: 'Message from Todo',
      text: '',
      html: `
          <div>
              <a href="http://localhost:4200/api/auth/confirm/${token}">verify account</a>
          </div>
          `
    });
  }

  async sendResset(email: string, token: string) {
    await this.transporter.sendMail({
      from: '"cgs" <nodejs@example.com>',
      to: email,
      subject: 'Message from Todo',
      text: '',
      html: `
          <div>
              <a href="http://localhost:3000/reset-password/${token}">reset password</a>
          </div>
          `
    });
  }
}

export const mailer = new Mailer();
