import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @MessagePattern({ cmd: 'send_confirm_email' })
    async sendConfirmation(data: any) {
        console.log("Email_Sent!")
        console.log(data)
        return await this.mailService.sendConfirmEmail(data)}

    @MessagePattern({ cmd: 'send_welcome_email' })
    async sendWelcome(data: any) {
            console.log("Email_Sent!")
            console.log(data)
            return await this.mailService.sendWelcomeEmail(data)}
}
