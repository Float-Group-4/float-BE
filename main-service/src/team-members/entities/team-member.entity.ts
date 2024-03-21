import { ApiProperty } from '@nestjs/swagger';
import { TeamMember } from '@prisma/client';

export class TeamMemberEntity implements TeamMember {
  @ApiProperty()
  id: string;
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  userId: string;
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
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  archived: boolean;
  @ApiProperty()
  deleted: boolean;
}
