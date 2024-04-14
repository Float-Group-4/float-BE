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
import { ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RedisService } from 'src/redis/redis.service';

@Controller('activities')
@ApiTags('Activities')
export class ActivitiesController {
  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createAcitvityDto: CreateActivityDto) {
    return this.activitiesService.create(createAcitvityDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_Activities');
    if (cached) {
      return cached;
    }
    const result = await this.activitiesService.findAll();
    // const result = await this.activitiesService.findOne(id);
    if (result) await this.redisService.set('get_Activities', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_Activity_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.activitiesService.findOne(id);
    if (result) await this.redisService.set('get_Activity_' + id, result);
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcitvityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(id, updateAcitvityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
