import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty()
  teamMemberId: string;
  @ApiProperty()
  typeId: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
}
