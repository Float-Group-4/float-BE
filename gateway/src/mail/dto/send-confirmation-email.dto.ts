import { IsString } from 'class-validator';

export class SendConfirmationEmailDto
{
  @IsString()
  name: string;

  @IsString()
  toEmail: string;

  @IsString()
  sender: string;

  @IsString()
  subject: string;

  @IsString()
  token: string;
}