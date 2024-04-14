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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('projects')
@ApiTags('Projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_Projects');
    if (cached) {
      return cached;
    }
    const result = await this.projectService.findAll();
    if (result) await this.redisService.set('get_Projects', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_Project_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.projectService.findOne(id);
    if (result) await this.redisService.set('get_Project_' + id, result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  async findAllByTeamId(@Param('teamId') teamId: string) {
    const cached = await this.redisService.get(
      'get_ProjectsByTeamId_' + teamId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.projectService.findAllByTeamId(teamId);
    if (result)
      await this.redisService.set('get_ProjectsByTeamId_' + teamId, result);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
