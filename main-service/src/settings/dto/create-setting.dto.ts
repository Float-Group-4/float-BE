import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  timeZone: string;
  @ApiProperty()
  startWeek: string;
  @ApiProperty()
  timeFormat: string;
  @ApiProperty()
  isShowWeekend: boolean;
  @ApiProperty()
  workDay: string;
}
