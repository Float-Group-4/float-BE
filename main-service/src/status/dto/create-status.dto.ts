import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  teamMemberId: string;

  @ApiProperty()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;
}
