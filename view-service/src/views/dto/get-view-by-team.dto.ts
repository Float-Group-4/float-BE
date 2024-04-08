import { ApiProperty } from '@nestjs/swagger';

export class GetViewByTeamDto {
  @ApiProperty()
  teamId: string;

  @ApiProperty()
  userId: string;
}
