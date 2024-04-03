import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailServiceClient: ClientProxy,
  ) {}

  async sendEmail(SendEmailDto: SendEmailDto) {
    console.log("Email sent!");
    return await firstValueFrom(this.mailServiceClient.send({ cmd: 'send_email' }, SendEmailDto));
  }
}
