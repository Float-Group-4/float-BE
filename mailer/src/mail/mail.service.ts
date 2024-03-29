import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessagePattern} from '@nestjs/microservices';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
  
    async sendUserConfirmation(data: any) {
      try {
        const { email, name, token } = data; // Destructure the fields from the data object
        const url = `example.com/auth/confirm?token=${token}`;
  
        await this.mailerService.sendMail({
          to: email,
          from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Float! Confirm your Email',
          template: './confirmation',
          context: {
            name: name,
            url: url,
          },
        });
      } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
      }
    }
}
