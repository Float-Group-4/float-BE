import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class TeamEntity implements Team {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  teamOwnerId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  archived: boolean;
  @ApiProperty()
  deleted: boolean;
}
