import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '@prisma/client';

export class AcitvityEntity implements Activity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  teamMemberId: string;
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  activity: string;
  @ApiProperty()
  timeStamp: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
