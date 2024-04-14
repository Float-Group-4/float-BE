import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get(':projectId/tasks')
  @UseInterceptors(CacheInterceptor)
  async getAllTasksByProjectId(@Param('projectId') projectId: string) {
    const cached = await this.redisService.get(
      'get_TasksByProjectId_' + projectId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.taskService.getAllTasksByProjectId(projectId);
    if (result)
      await this.redisService.set('get_TasksByProjectId_' + projectId, result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getTaskById(@Param('id') id: string) {
    const cached = await this.redisService.get('get_Task_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.taskService.getTaskById(id);
    if (result) await this.redisService.set('get_Task_' + id, result);
    return result;
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
