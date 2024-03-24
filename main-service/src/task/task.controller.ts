import { MessagePattern } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Controller } from '@nestjs/common';
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'create_task' })
  create(createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @MessagePattern({ cmd: 'get_all_tasks' })
  getAllTasksByProjectId(id: string) {
    return this.taskService.getAllTasksByProjectId(id);
  }

  @MessagePattern({ cmd: 'get_task_by_id' })
  getTaskById(id: string) {
    return this.taskService.getTaskById(id);
  }

  @MessagePattern({ cmd: 'delete_task_by_id' })
  deleteTaskById(id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
