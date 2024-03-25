import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  projectId: string;
}
