import { MessagePattern } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern('create_task')
  create(createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @MessagePattern('get_all_tasks')
  getAllTasksByProjectId(projectId: string) {
    return this.taskService.getAllTasksByProjectId(projectId);
  }

  @MessagePattern('get_task_by_id')
  getTaskById(id: string) {
    return this.taskService.getTaskById(id);
  }

  @MessagePattern('update_task')
  deleteTaskById(id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
