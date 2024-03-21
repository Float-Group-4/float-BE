import { Injectable } from '@nestjs/common';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AllocationService {
  constructor(private prisma: PrismaService) {}

  create(createAllocationDto: CreateAllocationDto) {
    return this.prisma.allocation.create({
      data: {
        teamMemberId: createAllocationDto.teamMemberId,
        taskId: createAllocationDto.taskId,
        startDate: createAllocationDto.startDate,
        endDate: createAllocationDto.endDate,
        workHours: createAllocationDto.workHours,
        status: createAllocationDto.status,
        description: createAllocationDto.description,
      },
    });
  }

  findAll() {
    return this.prisma.allocation.findMany();
  }

  findOne(id: string) {
    return this.prisma.allocation.findUnique({ where: { id: id } });
  }

  update(id: string, updateAllocationDto: UpdateAllocationDto) {
    return this.prisma.allocation.update({
      where: { id: id },
      data: {
        teamMemberId: updateAllocationDto.teamMemberId,
        taskId: updateAllocationDto.taskId,
        startDate: updateAllocationDto.startDate,
        endDate: updateAllocationDto.endDate,
        workHours: updateAllocationDto.workHours,
        status: updateAllocationDto.status,
        description: updateAllocationDto.description,
      },
    });
  }

  remove(id: string) {
    return this.prisma.allocation.delete({ where: { id: id } });
  }
}
