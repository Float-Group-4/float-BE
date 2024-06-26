import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { GetTeamMembersDto } from './dto/get-team-members-dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamMembersService } from './team-members.service';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('team-members')
@ApiTags('Team Members')
export class TeamMembersController {
  constructor(
    private readonly teamMembersService: TeamMembersService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamMembersService.create(createTeamMemberDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_TeamMembers');
    if (cached) {
      return cached;
    }
    const result = await this.teamMembersService.findAll();
    if (result) await this.redisService.set('get_TeamMembers', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_TeamMember_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.teamMembersService.findOne(id);
    if (result) await this.redisService.set('get_TeamMember_' + id, result);
    return result;
  }

  @Get('search')
  @UseInterceptors(CacheInterceptor)
  async findAllFiltered(@Query() query: GetTeamMembersDto) {
    const cached = await this.redisService.get('get_TeamMembersFiltered');
    if (cached) {
      return cached;
    }
    const { teamId, filter } = query;
    const result = await this.teamMembersService.findAllWithFilters(
      teamId,
      filter,
    );
    if (result) await this.redisService.set('get_TeamMembersFiltered', result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  async findAllByTeamId(@Param('teamId') teamId: string) {
    const cached = await this.redisService.get(
      'get_TeamMembersByTeamId_' + teamId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.teamMembersService.findAllByTeamId(teamId);
    if (result)
      await this.redisService.set('get_TeamMembersByTeamId_' + teamId, result);
    return result;
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
