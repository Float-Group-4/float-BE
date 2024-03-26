import { ApiProperty } from '@nestjs/swagger';

export class CreateAllocationDto {
  @ApiProperty({ required: true })
  teamMemberId: string;

  @ApiProperty({ required: true })
  taskId: string;

  @ApiProperty({ required: true })
  startDate: Date;

  @ApiProperty({ required: true })
  endDate: Date;

  @ApiProperty({ required: true, minimum: 0.1, maximum: 24 })
  workHours: number = 0.1;

  @ApiProperty({ required: false })
  status?: number = 0;

  @ApiProperty({ required: false })
  description: string;
}
