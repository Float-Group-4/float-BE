import { Injectable } from '@nestjs/common';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOffsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTimeOffDto: CreateTimeOffDto) {
    return this.prisma.timeOff.create({
      data: {
        ...createTimeOffDto,
      },
    });
  }

  findAll() {
    return this.prisma.timeOff.findMany();
  }

  findAllTimeOffByTeamId(teamId: string) {
    return this.prisma.timeOff.findMany({
      where: {
        TeamMember: {
          teamId: teamId,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.timeOff.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTimeOffDto: UpdateTimeOffDto) {
    return this.prisma.timeOff.update({
      where: {
        id,
      },
      data: {
        ...updateTimeOffDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.timeOff.delete({
      where: {
        id,
      },
    });
  }
}
