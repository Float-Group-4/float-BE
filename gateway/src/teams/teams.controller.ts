import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTeamDto, initTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('team')
@ApiTags('Teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Post('init')
  init(@Body() createTeamDto: initTeamDto) {
    return this.teamsService.initTeam(createTeamDto);
  }

  @Get('')
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_Teams');
    if (cached) {
      return cached;
    }
    const result = await this.teamsService.findAll();
    if (result) await this.redisService.set('get_Teams', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_Team_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.teamsService.findOne(id);
    if (result) {
      await this.redisService.set('get_Team_' + id, result);
    }
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }

  @Get('user/:userId')
  @UseInterceptors(CacheInterceptor)
  async getTeamByUser(@Param('userId') userId: string) {
    const cached = await this.redisService.get('get_TeamByUser_' + userId);
    if (cached) {
      return cached;
    }
    const result = await this.teamsService.getTeamByUser(userId);
    if (result) await this.redisService.set('get_TeamByUser_' + userId, result);
    return result;
  }
}
