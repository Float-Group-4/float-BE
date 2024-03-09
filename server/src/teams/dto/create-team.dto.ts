import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class CreateTeamDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  teamOwnerId: string;
}
