import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectMemberDto {
  @ApiProperty({ required: false })
  projectId: string;

  @ApiProperty({ required: false })
  teamMemberId: string;
}
