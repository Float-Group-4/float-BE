import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  name: string;
}
