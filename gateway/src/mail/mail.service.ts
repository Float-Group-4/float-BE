import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class MailerService {
    constructor(
      @Inject('MAILER_SERVICE') private readonly mailServiceClient: ClientProxy,
    ) {}

    async sendUserConfirmation(email: string, name: string, token: string) {
        console.log("Email sent!")
        return await firstValueFrom(this.mailServiceClient.send({ cmd: 'send_confirmation' }, {email,name,token}));
      }
}
