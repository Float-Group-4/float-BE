import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAllocationDto } from './create-allocation.dto';

export class UpdateAllocationDto extends PartialType(CreateAllocationDto) {
  @ApiProperty({ required: false })
  teamMemberId: string;

  @ApiProperty({ required: false })
  taskId: string;

  @ApiProperty({ required: false })
  startDate: Date;

  @ApiProperty({ required: false })
  endDate: Date;

  @ApiProperty({ required: false, minimum: 0.1, maximum: 24 })
  workHours: number = 0.1;

  @ApiProperty({ required: false })
  status?: number = 0;

  @ApiProperty({ required: false })
  description?: string;
}
