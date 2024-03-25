import { ApiProperty } from '@nestjs/swagger';
import type { TimeOff } from '@prisma/client';

export class TimeOffEntity implements TimeOff {
  @ApiProperty()
  id: string;
  @ApiProperty()
  teamMemberId: string;
  @ApiProperty()
  typeId: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
