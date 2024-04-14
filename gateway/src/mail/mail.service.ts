import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SendWelcomeEmailDto } from './dto/send-email-welcome.dto';
import { SendConfirmEmailDto } from './dto/send-email-confirm.dto';

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailServiceClient: ClientProxy,
  ) {}

  async sendConfirmEmail(SendEmailDto: SendConfirmEmailDto) {
    return await firstValueFrom(
      this.mailServiceClient.send({ cmd: 'send_confirm_email' }, SendEmailDto),
    );
  }

  async sendWelcomeEmail(SendEmailDto: SendWelcomeEmailDto) {
    return await firstValueFrom(
      this.mailServiceClient.send({ cmd: 'send_welcome_email' }, SendEmailDto),
    );
  }
}
