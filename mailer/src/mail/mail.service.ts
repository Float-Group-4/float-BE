import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { send } from 'process';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(data: any) {
    try {
      const { toEmail, subject, sender, template, context } = data; // Destructure the fields from the data object

      await this.mailerService.sendMail({
        to: toEmail,
        from: sender, // override default from
        subject: subject,
        template: template,
        context: context,
      });
      return 0;
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Failed to send email');
    }
  }
}
