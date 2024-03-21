import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  client: string;

  @ApiProperty({ required: false })
  @IsString()
  budget: string;

  @ApiProperty({ required: false })
  @IsString()
  updatedAt: Date;

  @ApiProperty({ required: false })
  @IsString()
  deleted: boolean;

  @ApiProperty({ required: false })
  @IsString()
  archived: boolean;
}
