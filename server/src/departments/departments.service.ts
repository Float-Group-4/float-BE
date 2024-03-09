import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  findAll() {
    return this.prisma.department.findMany();
  }

  findOne(id: string) {
    return this.prisma.department.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: {
        id,
      },
      data: {
        ...updateDepartmentDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.department.delete({
      where: {
        id,
      },
    });
  }
}
