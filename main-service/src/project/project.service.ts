import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        projectOwnerId: createProjectDto.projectOwnerId,
        client: createProjectDto.client,
        bugdet: createProjectDto.budget,
        createdAt: new Date(),
        teamId: createProjectDto.teamId,
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({});
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id: id } });
  }

  async findAllByTeamId(teamId: string) {
    return this.prisma.project.findMany({
      where: {
        Team: {
          id: teamId,
        },
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id: id },
      data: {
        name: updateProjectDto.name,
        client: updateProjectDto.client,
        bugdet: updateProjectDto.budget,
        updatedAt: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id: id } });
  }

  // remove(id: number,  updateProjectDto: UpdateProjectDto) {
  //     return this.prisma.project.update({
  //       where: {id :id},
  //       data: {
  //         //deleted: true,
  //         updatedAt: new Date(),
  //       },
  //     })  }
}
