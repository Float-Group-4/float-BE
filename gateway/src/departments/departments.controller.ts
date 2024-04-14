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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_Departments');
    if (cached) {
      return cached;
    }
    const result = await this.departmentsService.findAll();
    if (result) await this.redisService.set('get_Departments', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_Department_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.departmentsService.findOne(id);
    if (result) await this.redisService.set('get_Department_' + id, result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  async findByTeamId(@Param('teamId') teamId: string) {
    const cached = await this.redisService.get(
      'get_DepartmentsByTeamId_' + teamId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.departmentsService.findByTeamId(teamId);
    if (result)
      await this.redisService.set('get_DepartmentsByTeamId_' + teamId, result);
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
