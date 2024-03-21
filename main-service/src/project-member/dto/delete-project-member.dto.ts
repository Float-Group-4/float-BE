import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectMemberDto {
  @ApiProperty({ required: false })
  projectId: string;

  @ApiProperty({ required: false })
  teamMemberId: string;
}
