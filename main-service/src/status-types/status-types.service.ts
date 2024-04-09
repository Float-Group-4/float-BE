import { Injectable } from '@nestjs/common';
import { CreateStatusTypeDto } from './dto/create-status-type.dto';
import { UpdateStatusTypeDto } from './dto/update-status-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusTypesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createStatusTypeDto: CreateStatusTypeDto) {
    return this.prisma.statusType.create({
      data: {
        ...createStatusTypeDto,
      },
    });
  }

  findAll() {
    return this.prisma.statusType.findMany();
  }

  findOne(id: string) {
    return this.prisma.statusType.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateStatusTypeDto: UpdateStatusTypeDto) {
    return this.prisma.statusType.update({
      where: {
        id,
      },
      data: {
        ...updateStatusTypeDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.statusType.delete({
      where: {
        id,
      },
    });
  }
}
