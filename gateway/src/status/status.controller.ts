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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('status')
@ApiTags('Statuses')
export class StatusController {
  constructor(
    private readonly statusService: StatusService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_Statuses');
    if (cached) {
      return cached;
    }
    const result = await this.statusService.findAll();
    if (result) await this.redisService.set('get_Statuses', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_Status_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.statusService.findOne(id);
    if (result) await this.redisService.set('get_Status_' + id, result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  async findAllStatusByTeamId(@Param('teamId') teamId: string) {
    const cached = await this.redisService.get(
      'get_StatusesByTeamId_' + teamId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.statusService.findAllStatusByTeamId(teamId);
    if (result)
      await this.redisService.set('get_StatusesByTeamId_' + teamId, result);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }
}
