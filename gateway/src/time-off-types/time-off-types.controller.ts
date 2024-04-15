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
import { TimeOffTypesService } from './time-off-types.service';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('time-off-types')
@ApiTags('Time Off Types')
export class TimeOffTypesController {
  constructor(
    private readonly timeOffTypesService: TimeOffTypesService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return this.timeOffTypesService.create(createTimeOffTypeDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_TimeOffTypes');
    if (cached) {
      return cached;
    }
    const result = await this.timeOffTypesService.findAll();
    if (result) await this.redisService.set('get_TimeOffTypes', result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  async findByTeamId(@Param('teamId') teamId: string) {
    const cached = await this.redisService.get(
      'get_TimeOffTypesByTeamId_' + teamId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.timeOffTypesService.findByTeamId(teamId);
    if (result)
      await this.redisService.set('get_TimeOffTypesByTeamId_' + teamId, result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_TimeOffType_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.timeOffTypesService.findOne(id);
    if (result) await this.redisService.set('get_TimeOffType_' + id, result);
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeOffTypeDto: UpdateTimeOffTypeDto,
  ) {
    return this.timeOffTypesService.update(id, updateTimeOffTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeOffTypesService.remove(id);
  }
}
