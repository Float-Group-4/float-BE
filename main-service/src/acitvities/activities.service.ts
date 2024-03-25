import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

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
    return this.prisma.$primary().activity.findMany();
  }

  findOne(id: string) {
    return this.prisma.activity.findUnique({
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
