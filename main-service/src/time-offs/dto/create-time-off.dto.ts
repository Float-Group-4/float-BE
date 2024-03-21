import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeOffDto {
  @ApiProperty()
  teamMemberId: string;
  @ApiProperty()
  typeId: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
}
