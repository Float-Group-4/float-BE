import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('task')
export class TaskService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
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

  getTaskById(taskId: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_task_by_id' }, { taskId }),
    );
  }

  getAllTasksByProjectId(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_all_tasks' }, { projectId: id }),
    );
  }
}
