import { IsString } from 'class-validator';

export class SendConfirmEmailDto
{

  @IsString()
  toEmail: string;

  @IsString()
  sender: string;

  @IsString()
  subject: string;

  @IsString()
  recipientName: string;

  @IsString()
  url: string;
}