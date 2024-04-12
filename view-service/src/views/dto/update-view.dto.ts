import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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

export class UpdateViewDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  personal: boolean;

  @ApiProperty()
  @IsOptional()
  settings: JSON;

  @ApiProperty({ type: [FilterDTO] })
  @IsOptional()
  filters: FilterDTO[];

  @ApiProperty()
  @IsOptional()
  pinned: boolean;

  @ApiProperty()
  @IsOptional()
  created: string;

  @ApiProperty()
  @IsOptional()
  modified: string;

  @ApiProperty()
  @IsOptional()
  created_by: string;

  @ApiProperty()
  @IsOptional()
  modified_by: string;

  @ApiProperty()
  @IsOptional()
  teamId: string;
}
