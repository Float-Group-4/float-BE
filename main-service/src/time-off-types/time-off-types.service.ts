import { Injectable } from '@nestjs/common';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOffTypesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return this.prisma.timeOffType.create({
      data: {
        ...createTimeOffTypeDto,
      },
    });
  }

  findAll() {
    return this.prisma.timeOffType.findMany();
  }

  findByTeamId(teamId: string) {
    return this.prisma.timeOffType.findMany({
      where: {
        teamId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.timeOffType.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTimeOffTypeDto: UpdateTimeOffTypeDto) {
    return this.prisma.timeOffType.update({
      where: {
        id,
      },
      data: {
        ...updateTimeOffTypeDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.timeOffType.delete({
      where: {
        id,
      },
    });
  }
}
