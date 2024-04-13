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
  getAllTasksByProjectId(@Param('id') id: string) {
    const cached = this.redisService.get('get_TasksByProjectId_' + id);
    if (cached) {
      return cached;
    }
    const result = this.taskService.getAllTasksByProjectId(id);
    this.redisService.set('get_TasksByProjectId_' + id, result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  getTaskById(@Param('id') id: string) {
    const cached = this.redisService.get('get_Task_' + id);
    if (cached) {
      return cached;
    }
    const result = this.taskService.getTaskById(id);
    this.redisService.set('get_Task_' + id, result);
    return result;
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
