import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ required: true })
  taskId: string;

  @ApiProperty({ required: false })
  name: string;
}
