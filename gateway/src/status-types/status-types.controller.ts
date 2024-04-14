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
import { StatusTypesService } from './status-types.service';
import { CreateStatusTypeDto } from './dto/create-status-type.dto';
import { UpdateStatusTypeDto } from './dto/update-status-type.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('status-types')
@ApiTags('status Types')
export class StatusTypesController {
  constructor(
    private readonly statusTypesService: StatusTypesService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createStatusTypeDto: CreateStatusTypeDto) {
    return this.statusTypesService.create(createStatusTypeDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_StatusTypes');
    if (cached) {
      return cached;
    }
    const result = await this.statusTypesService.findAll();
    if (result) await this.redisService.set('get_StatusTypes', result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  async findByTeamId(@Param('teamId') teamId: string) {
    const cached = await this.redisService.get(
      'get_StatusTypesByTeamId_' + teamId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.statusTypesService.findByTeamId(teamId);
    if (result)
      await this.redisService.set('get_StatusTypesByTeamId_' + teamId, result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_StatusType_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.statusTypesService.findOne(id);
    if (result) await this.redisService.set('get_StatusType_' + id, result);
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusTypeDto: UpdateStatusTypeDto,
  ) {
    return this.statusTypesService.update(id, updateStatusTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusTypesService.remove(id);
  }
}
