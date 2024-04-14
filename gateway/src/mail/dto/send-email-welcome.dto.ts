import { IsString } from 'class-validator';

export class SendWelcomeEmailDto
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
  inviterName: string;

  @IsString()
  teamName: string;

  @IsString()
  url: string;
}