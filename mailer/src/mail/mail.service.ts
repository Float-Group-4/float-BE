import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { send } from 'process';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
  
    async sendConfirmEmail(data: any) {
      try {
        const { toEmail, subject, sender, recipientName, url} = data; // Destructure the fields from the data object
  
        await this.mailerService.sendMail({
          to: toEmail,
          from: sender, // override default from
          subject: subject,
          template: './confirmation',
          context: {
            recipientName: recipientName,
            url: url  
          },
        });
        return 0;
      } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
      }
    }

    async sendWelcomeEmail(data: any) {
      try {
        const { toEmail, subject, sender, recipientName, inviterName, teamName, url  } = data;
        await this.mailerService.sendMail({
          to: toEmail,
          from: sender, // override default from
          subject: subject,
          template: './welcomeTeam',
          context: {
            recipientName: recipientName,
            inviterName: inviterName,
            teamName: teamName,
            url: url
          },
        });
        return 0;
      } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
      }
    }
  }
