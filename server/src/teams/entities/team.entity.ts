import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class TeamEntity implements Team {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  teamOwnerId: string;
}
