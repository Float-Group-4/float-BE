import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

@Injectable()
@ApiTags('Activities')
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createActivityDto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: {
        ...createActivityDto,
      },
    });
  }

  findAll() {
    console.log('findAll');
    // console.log(this.prisma);
    // console.log(this.prisma.$primary());
    // console.log(this.prisma.$replica());
    return this.prisma.activity.findMany();
    // return this.prisma.$replica().activity.findMany();
    // return this.prisma.activity.findMany();
  }

  findOne(id: string) {
    const prisma = new PrismaClient().$extends(
      readReplicas({
        url: [process.env.DATABASE_READ_URL_1],
      }),
    );

    return prisma.$primary().activity.findUnique({
      // return this.prisma.activity.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateActivityDto: UpdateActivityDto) {
    return this.prisma.activity.update({
      where: {
        id,
      },
      data: {
        ...updateActivityDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.activity.delete({
      where: {
        id,
      },
    });
  }
}
