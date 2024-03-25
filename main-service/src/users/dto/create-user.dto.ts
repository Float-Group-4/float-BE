import { ApiProperty } from '@nestjs/swagger';
import type { User } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  timeFormat: string;
  @ApiProperty()
  avatar: string;
}
