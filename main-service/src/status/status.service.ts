import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}
  create(createStatusDto: CreateStatusDto) {
    return this.prisma.status.create({
      data: {
        ...createStatusDto,
      },
    });
  }

  findAll() {
    return this.prisma.status.findMany();
  }

  findAllStatusByTeamId(teamId: string) {
    return this.prisma.status.findMany({
      where: {
        TeamMember: {
          teamId: teamId,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.status.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.prisma.status.update({
      where: {
        id,
      },
      data: {
        ...updateStatusDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.status.delete({
      where: {
        id,
      },
    });
  }
}
