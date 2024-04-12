import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  client: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  projectOwnerId: string;

  @ApiProperty()
  @IsString()
  budget: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamId: string;
}
