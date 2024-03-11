import { ApiProperty } from '@nestjs/swagger';
import { TimeOffType } from '@prisma/client';

export class TimeOffTypeEntity implements TimeOffType {
  @ApiProperty()
  id: string;
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  balance: string;
  @ApiProperty()
  days: number;
  @ApiProperty()
  EffectiveDate: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
