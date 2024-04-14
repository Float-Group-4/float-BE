import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
