import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  create(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({
      data: {
        ...createTeamDto,
      },
    });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  findOne(id: string) {
    return this.prisma.team.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: {
        id,
      },
      data: {
        ...updateTeamDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.team.delete({
      where: {
        id,
      },
    });
  }
}
