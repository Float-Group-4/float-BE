import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessagePattern} from '@nestjs/microservices';
import { send } from 'process';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
  
    async sendUserConfirmation(data: any) {
      try {
        const { toEmail, name, token, subject, sender  } = data; // Destructure the fields from the data object
        const url = `example.com/auth/confirm?token=${token}`;
  
        await this.mailerService.sendMail({
          to: toEmail,
          from: sender, // override default from
          subject: subject,
          template: './confirmation',
          context: {
            name: name,
            url: url,
          },
        });
        return 0;
      } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
      }
    }
}
