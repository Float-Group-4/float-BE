import { ApiProperty } from '@nestjs/swagger';
import { Setting } from '@prisma/client';

export class SettingEntity implements Setting {
  @ApiProperty()
  id: string;
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
