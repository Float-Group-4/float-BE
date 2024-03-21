import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  client: string;

  @ApiProperty()
  @IsString()
  projectOwnerId: string;

  @ApiProperty()
  @IsString()
  budget: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
