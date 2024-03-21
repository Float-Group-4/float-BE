import { ApiProperty } from '@nestjs/swagger';

export class PeopleFilterDto {
  @ApiProperty({ type: [String], description: 'Array of person IDs' })
  ids: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Flag to indicate whether to exclude people',
  })
  isExclude: boolean;
}

export class TagsFilterTMDto {
  @ApiProperty({ type: [String], description: 'Array of tag IDs' })
  ids: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Flag to indicate whether to exclude tags',
  })
  isExclude: boolean;
}

export class RoleFilterDto {
  @ApiProperty({ type: [String], description: 'Array of role IDs' })
  ids: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Flag to indicate whether to exclude roles',
  })
  isExclude: boolean;
}

export class TypeFilterDto {
  @ApiProperty({ type: [String], description: 'Array of type IDs' })
  ids: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Flag to indicate whether to exclude types',
  })
  isExclude: boolean;
}

export class DepartmentFilterDto {
  @ApiProperty({ type: [String], description: 'Array of department IDs' })
  ids: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Flag to indicate whether to exclude departments',
  })
  isExclude: boolean;
}

export class TeamMemberFilterDto {
  @ApiProperty({ type: PeopleFilterDto, description: 'Filter for people' })
  people: PeopleFilterDto;

  @ApiProperty({ type: TagsFilterTMDto, description: 'Filter for tags' })
  tags: TagsFilterTMDto;

  @ApiProperty({ type: RoleFilterDto, description: 'Filter for roles' })
  role: RoleFilterDto;

  @ApiProperty({ type: TypeFilterDto, description: 'Filter for types' })
  type: TypeFilterDto;

  @ApiProperty({
    type: DepartmentFilterDto,
    description: 'Filter for departments',
  })
  department: DepartmentFilterDto;
}

export class GetTeamMembersDto {
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  filter: TeamMemberFilterDto;
}
