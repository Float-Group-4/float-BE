import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    const { name, projectId } = createTaskDto;
    return this.prisma.task.create({
      data: {
        projectId,
        name,
      },
    });
  }

  async deleteTaskById(taskId: string) {
    // Find all allocations related to the task
    const allocations = await this.prisma.allocation.findMany({
      where: { taskId: taskId },
    });

    // If there are allocations, delete them first
    if (allocations.length > 0) {
      await Promise.all(
        allocations.map(async (allocation) => {
          await this.prisma.allocation.delete({
            where: { id: allocation.id },
          });
        }),
      );
    }

    // Now delete the task
    const deletedTask = await this.prisma.task.delete({
      where: { id: taskId },
    });

    // If the task wasn't found, throw NotFoundException
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return deletedTask;
  }

  getTaskById(taskId: string) {
    return this.prisma.task.findUnique({
      where: { id: taskId },
    });
  }

  getAllTasksByProjectId(id: string) {
    return this.prisma.task.findMany({
      where: { projectId: id },
    });
  }
}
