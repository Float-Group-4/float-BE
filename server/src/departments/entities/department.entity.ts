import { ApiProperty } from '@nestjs/swagger';
import { Department } from '@prisma/client';

export class DepartmentEntity implements Department {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  isSubDepart: boolean;
  @ApiProperty()
  teamMemberId: string;
}
