import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeOffTypeDto {
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
}
