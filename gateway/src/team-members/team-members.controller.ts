import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { GetTeamMembersDto } from './dto/get-team-members-dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('team-members')
@ApiTags('Team Members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @Post()
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamMembersService.create(createTeamMemberDto);
  }

  @Get()
  findAll() {
    return this.teamMembersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    return this.teamMembersService.findOne(id);
  }

  @Get('search')
  @UseInterceptors(CacheInterceptor)
  findAllFiltered(@Query() query: GetTeamMembersDto) {
    const { teamId, filter } = query;
    console.log('teamId', teamId);
    console.log('filter', filter.people.ids);
    return this.teamMembersService.findAllWithFilters(teamId, filter);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    return this.teamMembersService.update(id, updateTeamMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamMembersService.remove(id);
  }
}
