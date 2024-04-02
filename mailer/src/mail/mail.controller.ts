import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @MessagePattern({ cmd: 'send_email' })
    async sendConfirmation(data: any) {
        console.log("Email_Sent!")
        console.log(data)
        return await this.mailService.sendEmail(data)}
}
