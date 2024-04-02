import { IsString } from 'class-validator';

export class SendEmailDto
{

  @IsString()
  toEmail: string;

  @IsString()
  sender: string;

  @IsString()
  subject: string;

  @IsString()
  template: string;

  context: any;
}