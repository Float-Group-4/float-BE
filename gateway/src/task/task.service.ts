import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('tasks')
export class TaskService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const { name, projectId } = createTaskDto;
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_task' }, { name, projectId }),
    );
  }

  async deleteTaskById(taskId: string) {
    const task = await this.getTaskById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'delete_task_by_id' }, { taskId }),
    );
  }

  async getTaskById(taskId: string) {
    const cachedData = await this.cacheService.get(`find_task_by_id_${taskId}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_task_by_id' }, { taskId }),
    );
    await this.cacheService.set(`find_task_by_id_${taskId}`, data);
    return data;
  }

  async getAllTasksByProjectId(id: string) {
    const cachedData = await this.cacheService.get(
      `get_all_tasks_by_project_id_${id}`,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_all_tasks' }, { projectId: id }),
    );
    await this.cacheService.set(`get_all_tasks_by_project_id_${id}`, data);
    return data;
  }
}
