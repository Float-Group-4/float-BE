import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/user.entity';

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
