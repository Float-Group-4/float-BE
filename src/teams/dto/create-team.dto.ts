import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreateTeamDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  teamOwnerId?: string;
}

export class initTeamDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  user: UserEntity;
}
