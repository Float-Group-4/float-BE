import { ApiProperty } from '@nestjs/swagger';

export class ScheduleSortDTO {
  @ApiProperty()
  sortBy: string;

  @ApiProperty()
  sortDir: string;

  @ApiProperty()
  customSort: boolean;
}

export class FilterDTO {
  @ApiProperty()
  type: string;

  @ApiProperty({ type: [String] })
  values: string[];

  @ApiProperty()
  operator: string;
}

export class CreateViewDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  personal: boolean;

  @ApiProperty()
  settings: {
    page: string;
    scheduleSort: ScheduleSortDTO;
  };

  @ApiProperty({ type: [FilterDTO] })
  filters: FilterDTO[];

  @ApiProperty()
  pinned: boolean;

  @ApiProperty()
  created: string;

  @ApiProperty()
  modified: string;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
  modified_by: string;
}
