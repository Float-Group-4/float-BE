import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SendConfirmationEmailDto } from './dto/send-confirmation-email.dto';

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailServiceClient: ClientProxy,
  ) {}

  async sendUserConfirmation(SendConfirmationEmailDto: SendConfirmationEmailDto) {
    console.log("Email sent!");
    return await firstValueFrom(this.mailServiceClient.send({ cmd: 'send_confirmation' }, SendConfirmationEmailDto));
  }
}
