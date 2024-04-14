import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  hourlyRate: number;
  @ApiProperty()
  access: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  roleId: string;
  @ApiProperty()
  departmentId: string;
}
