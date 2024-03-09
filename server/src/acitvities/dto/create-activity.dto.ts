import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty()
  teamMemberId: string;
  @ApiProperty()
  activity: string;
  @ApiProperty()
  date: Date;
}
