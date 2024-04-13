import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { TimeOffsService } from './time-offs.service';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('time-offs')
@ApiTags('Time Offs')
export class TimeOffsController {
  constructor(
    private readonly timeOffsService: TimeOffsService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createTimeOffDto: CreateTimeOffDto) {
    return this.timeOffsService.create(createTimeOffDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    const cached = this.redisService.get('get_TimeOffs');
    if (cached) {
      return cached;
    }
    const result = this.timeOffsService.findAll();
    this.redisService.set('get_TimeOffs', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    const cached = this.redisService.get('get_TimeOff_' + id);
    if (cached) {
      return cached;
    }
    const result = this.timeOffsService.findOne(id);
    this.redisService.set('get_TimeOff_' + id, result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  findAllTimeOffByTeamId(@Param('teamId') teamId: string) {
    const cached = this.redisService.get('get_TimeOffsByTeamId_' + teamId);
    if (cached) {
      return cached;
    }
    const result = this.timeOffsService.findAllTimeOffByTeamId(teamId);
    this.redisService.set('get_TimeOffsByTeamId_' + teamId, result);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeOffDto: UpdateTimeOffDto) {
    return this.timeOffsService.update(id, updateTimeOffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeOffsService.remove(id);
  }
}
