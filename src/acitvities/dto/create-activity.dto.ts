import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty()
  teamMemberId: string;
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  activity: string;
  @ApiProperty()
  timeStamp: Date;
}
