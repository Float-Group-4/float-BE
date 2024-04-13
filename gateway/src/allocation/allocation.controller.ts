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
import { AllocationService } from './allocation.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('allocation')
@ApiTags('Allocation')
export class AllocationController {
  constructor(
    private readonly allocationService: AllocationService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createAllocationDto: CreateAllocationDto) {
    return this.allocationService.create(createAllocationDto);
  }
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    const cached = this.redisService.get('get_Allocations');
    if (cached) {
      return cached;
    }
    const result = this.allocationService.findAll();
    this.redisService.set('get_Allocations', result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  findAllByTeamId(@Param('teamId') teamId: string) {
    const cached = this.redisService.get('get_AllocationsByTeamId_' + teamId);
    if (cached) {
      return cached;
    }
    const result = this.allocationService.findAllByTeamId(teamId);
    this.redisService.set('get_AllocationsByTeamId_' + teamId, result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    const cached = this.redisService.get('get_Allocation_' + id);
    if (cached) {
      return cached;
    }
    const result = this.allocationService.findOne(id);
    this.redisService.set('get_Allocation_' + id, result);
    return result;
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAllocationDto: UpdateAllocationDto,
  ) {
    return this.allocationService.update(id, updateAllocationDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allocationService.remove(id);
  }
}
