import { Task } from '@prisma/client';

export class CreateTaskDto {
  title: string;
  estimatedHours: number;
  assigneeId: number;
  assigneeName: string;
  status: string;
}
